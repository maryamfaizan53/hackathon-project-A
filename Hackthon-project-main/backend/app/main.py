# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys

load_dotenv()

# ===== FASTAPI APPLICATION =====
app = FastAPI(
    title="FastAPI Backend with AI Support",
    description="Backend for authentication, user management, and AI chatbot",
    version="1.0.0"
)

# CORS configuration - Allow all for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8000",
        "https://hackthon-project-dusky.vercel.app",
        "https://hackathon-project-a.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ===== STARTUP EVENT =====
@app.on_event("startup")
async def startup_event():
    print("=" * 60)
    print("🚀 Starting FastAPI Backend...")
    print("=" * 60)
    
    # Check environment variables
    required_env_vars = ["SECRET_KEY", "DATABASE_URL", "GEMINI_API_KEY"]
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    
    if missing_vars:
        print(f"⚠️ WARNING: Missing environment variables: {', '.join(missing_vars)}")
        print("   Some features may not work correctly!")
    else:
        print("✅ All required environment variables are set")
    
    # Initialize database
    from app.database.db import init_db, check_db_health
    try:
        db_health = check_db_health()
        print(f"📊 Database health check: {db_health}")
        
        if db_health["database_connected"]:
            if init_db():
                print("✅ Database initialized successfully!")
            else:
                print("⚠️ Database initialization had issues but app will continue")
        else:
            print(f"❌ Database connection failed: {db_health.get('error', 'Unknown error')}")
            print("ℹ️ Chatbot will work, but authentication requires a valid database connection.")
            print("ℹ️ Update DATABASE_URL in backend/.env to enable authentication.")
    except Exception as e:
        print(f"❌ CRITICAL: Database startup error: {type(e).__name__}: {e}")
        print("ℹ️ Application will continue but database features will be unavailable")
        import traceback
        traceback.print_exc()
    
    print("=" * 60)
    print("✅ FastAPI Backend Started Successfully!")
    print("=" * 60)

# ===== HEALTH CHECK ENDPOINTS =====
@app.get("/health")
def health_check():
    """Basic health check endpoint for Railway and monitoring"""
    return {
        "status": "healthy",
        "service": "FastAPI Backend",
        "version": "1.0.0"
    }

@app.get("/db-health")
def database_health():
    """Database health check endpoint"""
    from app.database.db import check_db_health
    try:
        health_status = check_db_health()
        status_code = 200 if health_status["database_connected"] else 503
        return {
            "status": "healthy" if health_status["database_connected"] else "unhealthy",
            **health_status
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

# ===== ROUTES =====
@app.get("/")
def read_root():
    return {
        "message": "FastAPI backend is running!",
        "features": ["Authentication", "User Management", "AI Chatbot via /api/query"],
        "health_endpoints": ["/health", "/db-health"]
    }

# ===== INCLUDE API ROUTERS =====
from app.api import auth
from app.api import chat

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api", tags=["chat"])