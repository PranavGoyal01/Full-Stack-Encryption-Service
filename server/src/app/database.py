"""
Database configuration and connection management.

Sets up SQLAlchemy engine, session management, and Base class for ORM models.
"""

from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/securelog")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """
    Provides a database session for dependency injection.
    The session is automatically closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()