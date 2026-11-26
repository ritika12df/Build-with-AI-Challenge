
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timezone
from urllib.parse import urlparse
from app.services.explorer import explore_website
from app.services.test_runner import run_basic_tests
from app.services.gemini_service import (
    generate_ai_response,
    generate_test_scenarios
)
from urllib.parse import urlparse
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from app.services.bug_report import generate_bug_report
from app.database import (
    initialize_database,
    save_test_run,
    get_test_history
)


app = FastAPI(
    title="TestPilot AI",
    description="Autonomous Website Testing Agent API",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_event():
    initialize_database()

# Serve captured screenshots
SCREENSHOT_DIR = Path(__file__).resolve().parents[1] / "screenshots"

SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

app.mount(
    "/screenshots",
    StaticFiles(directory=str(SCREENSHOT_DIR)),
    name="screenshots"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://expert-xylophone-555jq96qgjpcv6v5-5173.app.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class WebsiteRequest(BaseModel):
    url: str

class AIRequest(BaseModel):
    prompt: str    


# Home endpoint
@app.get("/")
async def home():
    return {
        "message": "Welcome to TestPilot AI!",
        "status": "running"
    }


# Health-check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "success": True,
        "application": "TestPilot AI",
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


# Prepare website testing endpoint
@app.post("/api/tests/prepare")
async def prepare_test(request: WebsiteRequest):

    website_url = request.url.strip()

    try:
        parsed_url = urlparse(website_url)

        if (
            parsed_url.scheme not in ["http", "https"]
            or not parsed_url.hostname
            or not parsed_url.hostname.strip()
        ):
            raise ValueError("Invalid URL")

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid HTTP or HTTPS website URL."
        )

    return {
        "success": True,
        "url": website_url,
        "message": "Website URL received and validated successfully!",
        "status": "ready_for_testing"
    }


@app.post("/api/tests/explore")
async def explore_test(request: WebsiteRequest):
    website_url = request.url.strip()

    try:
        parsed_url = urlparse(website_url)

        if (
            parsed_url.scheme not in ["http", "https"]
            or not parsed_url.hostname
        ):
            raise HTTPException(
                status_code=400,
                detail="Please provide a valid HTTP or HTTPS URL."
            )

        result = await explore_website(website_url)
        return result

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except HTTPException:
        raise    

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

@app.post("/api/tests/run")
async def run_website_tests(request: WebsiteRequest):
    website_url = request.url.strip()

    try:
        parsed_url = urlparse(website_url)

        if (
            parsed_url.scheme not in ["http", "https"]
            or not parsed_url.hostname
        ):
            raise HTTPException(
                status_code=400,
                detail="Please provide a valid HTTP or HTTPS URL."
            )

        # Run automated website tests
        results = await run_basic_tests(website_url)

        # Save the test results in SQLite
        test_run_id = save_test_run(results)

        return {
            **results,
            "test_run_id": test_run_id,
            "message": "Test results saved successfully!"
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

@app.post("/api/ai/test")
async def test_gemini(request: AIRequest):
    try:
        ai_response = generate_ai_response(request.prompt)

        return {
            "success": True,
            "message": "Gemini AI connected successfully!",
            "response": ai_response
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )      

@app.post("/api/ai/generate-scenarios")
async def generate_scenarios(request: WebsiteRequest):
    try:
        # Explore the website first
        website_data = await explore_website(request.url)

        # Ask Gemini to generate test scenarios
        scenarios = generate_test_scenarios(website_data)

        return {
            "success": True,
            "website_url": request.url,
            "scenarios": scenarios
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

@app.post("/api/reports/bugs")
async def create_bug_report(request: WebsiteRequest):
    try:
        # Run automated website tests
        test_data = await run_basic_tests(request.url)

        # Generate bug report from test results
        report = generate_bug_report(test_data)

        return {
            "success": True,
            "message": "Bug report generated successfully!",
            "report": report
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )     
  
@app.get("/api/tests/history")
async def get_test_history_endpoint(
    limit: int = Query(default=20, ge=1, le=100)
):
    try:
        history = get_test_history(limit)

        return {
            "success": True,
            "total_runs": len(history),
            "history": history
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
         


