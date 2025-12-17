# backend/src/services/user_service.py

from typing import Optional
from uuid import UUID, uuid4
from app.models.user import UserInDB
from app.database.db import get_db_connection

def get_user_by_email(email: str) -> Optional[UserInDB]:
    """Get user from database by email"""
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT user_id, email, name, hashed_password, 
                   level, languages, ai_experience, hardware_knowledge
            FROM users WHERE email = %s
        """, (email,))
        
        row = cursor.fetchone()
        
        if not row:
            print(f"ℹ️ No user found with email: {email}")
            return None
        
        # Convert database row to UserInDB model
        from app.models.user import UserPreferences
        
        user = UserInDB(
            userId=row['user_id'],
            email=row['email'],
            name=row['name'],
            hashed_password=row['hashed_password'],
            preferences=UserPreferences(
                level=row['level'],
                languages=row['languages'] or [],
                aiExperience=row['ai_experience'],
                hardwareKnowledge=row['hardware_knowledge']
            )
        )
        
        print(f"✅ User found: {email}")
        return user
        
    except Exception as e:
        print(f"❌ Error getting user by email ({email}): {type(e).__name__}: {e}")
        raise
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def create_user(user: UserInDB) -> UserInDB:
    """Create new user in database"""
    conn = None
    cursor = None
    
    try:
        # Generate UUID if not provided
        if not user.userId:
            user.userId = uuid4()
        
        print(f"🔄 Creating new user: {user.email}")
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO users (
                user_id, email, name, hashed_password,
                level, languages, ai_experience, hardware_knowledge
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING user_id
        """, (
            str(user.userId),
            user.email,
            user.name,
            user.hashed_password,
            user.preferences.level,
            user.preferences.languages,
            user.preferences.aiExperience,
            user.preferences.hardwareKnowledge
        ))
        
        conn.commit()
        print(f"✅ User created successfully: {user.email}")
        return user
        
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"❌ Error creating user ({user.email}): {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def get_user_by_id(user_id: UUID) -> Optional[UserInDB]:
    """Get user by ID"""
    conn = None
    cursor = None
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT user_id, email, name, hashed_password,
                   level, languages, ai_experience, hardware_knowledge
            FROM users WHERE user_id = %s
        """, (str(user_id),))
        
        row = cursor.fetchone()
        
        if not row:
            print(f"ℹ️ No user found with ID: {user_id}")
            return None
        
        from app.models.user import UserPreferences
        
        user = UserInDB(
            userId=row['user_id'],
            email=row['email'],
            name=row['name'],
            hashed_password=row['hashed_password'],
            preferences=UserPreferences(
                level=row['level'],
                languages=row['languages'] or [],
                aiExperience=row['ai_experience'],
                hardwareKnowledge=row['hardware_knowledge']
            )
        )
        
        print(f"✅ User found by ID: {user_id}")
        return user
        
    except Exception as e:
        print(f"❌ Error getting user by ID ({user_id}): {type(e).__name__}: {e}")
        raise
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()