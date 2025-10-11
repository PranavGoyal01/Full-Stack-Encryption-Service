"""
Pydantic schemas for request/response validation.
"""

from pydantic import BaseModel
from typing import List


class EncryptDecryptRequest(BaseModel):
    """Request schema for encryption/decryption operations."""
    key: str
    data: str


class EncryptDecryptResponse(BaseModel):
    """Response schema for encryption/decryption operations."""
    data: str


class LogBase(BaseModel):
    """Base schema for log entries."""
    id: str
    timestamp: int
    ip: str
    data: str


class LogResponse(LogBase):
    """Response schema for individual log entries."""
    pass


class LogsResponse(BaseModel):
    """Response schema for paginated log queries."""
    logs: List[LogResponse]
    total: int