# backend/src/database/db.py

import psycopg2
from psycopg2.extras import RealDictCursor
import os
import time
from dotenv import load_dotenv
from typing import Optional, Dict, Any

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection(max_retries: int = 3, retry_delay: float = 1.0):
    """
    Get database connection with retry logic
    
    Args:
        max_retries: Maximum number of connection attempts
        retry_delay: Delay between retries in seconds
        
    Returns:
        psycopg2 connection object
        
    Raises:
        Exception: If connection fails after all retries
    """
    if not DATABASE_URL:
        error_msg = "DATABASE_URL environment variable is not set!"
        print(f"❌ CRITICAL ERROR: {error_msg}")
        raise ValueError(error_msg)
    
    last_exception = None
    for attempt in range(1, max_retries + 1):
        try:
            print(f"🔄 Database connection attempt {attempt}/{max_retries}...")
            conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
            print(f"✅ Database connection successful on attempt {attempt}")
            return conn
        except psycopg2.OperationalError as e:
            last_exception = e
            print(f"⚠️ Database connection failed (attempt {attempt}/{max_retries}): {e}")
            if attempt < max_retries:
                print(f"   Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
        except Exception as e:
            last_exception = e
            print(f"❌ Unexpected database error: {type(e).__name__}: {e}")
            raise
    
    # All retries exhausted
    error_msg = f"Failed to connect to database after {max_retries} attempts. Last error: {last_exception}"
    print(f"❌ {error_msg}")
    raise Exception(error_msg)

def check_db_health() -> Dict[str, Any]:
    """
    Check database connectivity and health
    
    Returns:
        Dictionary with health status information
    """
    health_status = {
        "database_connected": False,
        "database_url_configured": bool(DATABASE_URL),
        "tables_exist": False,
        "error": None
    }
    
    if not DATABASE_URL:
        health_status["error"] = "DATABASE_URL not configured"
        return health_status
    
    try:
        # Test connection
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        health_status["database_connected"] = True
        
        # Check if users table exists
        cursor = conn.cursor()
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'users'
            )
        """)
        result = cursor.fetchone()
        table_exists = result['exists'] if result else False
        health_status["tables_exist"] = table_exists
        
        cursor.close()
        conn.close()
        
        print("✅ Database health check passed")
        
    except psycopg2.OperationalError as e:
        health_status["error"] = f"Database connection failed: {str(e)}"
        print(f"❌ Database health check failed: {e}")
    except Exception as e:
        health_status["error"] = f"Unexpected error: {type(e).__name__}: {str(e)}"
        print(f"❌ Database health check error: {e}")
    
    return health_status

def init_db():
    """Initialize database with users table"""
    try:
        print("🔧 Initializing database...")
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id UUID PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                hashed_password VARCHAR(255) NOT NULL,
                level VARCHAR(50),
                languages TEXT[],
                ai_experience VARCHAR(50),
                hardware_knowledge VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        cursor.close()
        conn.close()
        print("✅ Database initialized successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Database initialization failed: {type(e).__name__}: {e}")
        print(f"   Connection string (masked): postgresql://...@{DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'unknown'}")
        return False