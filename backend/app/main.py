
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

app = FastAPI(
    title="TestPilot AI",
    description="Autonomous Website Testing Agent API",
    version="1.0.0"
)

# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {
        "message": "Welcome to TestPilot AI!",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    return {
        "success": True,
        "application": "TestPilot AI",
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
