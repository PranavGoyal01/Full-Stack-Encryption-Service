"""
Database models for SecureLog application.

This module defines the SQLAlchemy ORM models for storing operation logs.
"""

from sqlalchemy import Column, String, Integer, DateTime
from .database import Base
import uuid
from datetime import datetime


class Log(Base):
    """
    Log model for storing encryption/decryption operation records.

    Attributes:
        id: Unique identifier (UUID format as string)
        timestamp: Unix timestamp when the operation occurred
        ip: IP address of the client
        data: Operation type ("encrypt" or "decrypt")
    """
    __tablename__ = "logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    timestamp = Column(Integer, default=lambda: int(datetime.utcnow().timestamp()))
    ip = Column(String)
    data = Column(String)