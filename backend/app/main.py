
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timezone
from urllib.parse import urlparse
from app.services.explorer import explore_website
from urllib.parse import urlparse

app = FastAPI(
    title="TestPilot AI",
    description="Autonomous Website Testing Agent API",
    version="1.0.0"
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


