"""
SecureLog Encryption Service API

FastAPI application providing Caesar cipher encryption and decryption
with logging of all operations.
"""

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from .database import get_db, engine, Base
from .models import Log
from .schemas import EncryptDecryptRequest, EncryptDecryptResponse, LogResponse, LogsResponse
from .crypto import encrypt_data, decrypt_data

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SecureLog Encryption Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """Root endpoint providing API information."""
    return {"message": "Welcome to SecureLog Encryption Service API"}


@app.post("/api/v1/encrypt", response_model=EncryptDecryptResponse)
async def encrypt_endpoint(request: Request, req: EncryptDecryptRequest, db: Session = Depends(get_db)):
    """
    Encrypt data using Caesar cipher.

    Args:
        request: FastAPI request object
        req: Request body with 'key' (shift value) and 'data' (plain text)
        db: Database session

    Returns:
        EncryptDecryptResponse with encrypted data

    Raises:
        HTTPException: 400 for invalid inputs, 500 for server errors
    """
    if not req.key or not req.key.strip():
        raise HTTPException(status_code=400, detail="Key (shift value) is required and cannot be empty")

    if not req.data or not req.data.strip():
        raise HTTPException(status_code=400, detail="Data to encrypt is required and cannot be empty")

    try:
        encrypted_data = encrypt_data(req.key, req.data)

        client_ip = request.client.host
        log = Log(ip=client_ip, data="encrypt")
        db.add(log)
        db.commit()

        return EncryptDecryptResponse(data=encrypted_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Encryption failed: {str(e)}")

@app.post("/api/v1/decrypt", response_model=EncryptDecryptResponse)
async def decrypt_endpoint(request: Request, req: EncryptDecryptRequest, db: Session = Depends(get_db)):
    """
    Decrypt data using Caesar cipher.

    Args:
        request: FastAPI request object
        req: Request body with 'key' (shift value) and 'data' (encrypted data)
        db: Database session

    Returns:
        EncryptDecryptResponse with decrypted data

    Raises:
        HTTPException: 400 for invalid inputs, 500 for server errors
    """
    if not req.key or not req.key.strip():
        raise HTTPException(status_code=400, detail="Key (shift value) is required and cannot be empty")

    if not req.data or not req.data.strip():
        raise HTTPException(status_code=400, detail="Encrypted data is required and cannot be empty")

    try:
        decrypted_data = decrypt_data(req.key, req.data)

        client_ip = request.client.host
        log = Log(ip=client_ip, data="decrypt")
        db.add(log)
        db.commit()

        return EncryptDecryptResponse(data=decrypted_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Decryption failed: {str(e)}")

@app.get("/api/v1/logs", response_model=LogsResponse)
async def get_logs(
    size: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Retrieve paginated logs of encryption/decryption operations.

    Args:
        size: Number of logs per page (default: 10)
        offset: Number of logs to skip (default: 0)
        db: Database session

    Returns:
        LogsResponse with logs list and total count

    Raises:
        HTTPException: 400 if size < 1 or offset < 0
    """
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be at least 1")
    if offset < 0:
        raise HTTPException(status_code=400, detail="Offset cannot be negative")

    total = db.query(Log).count()
    logs = db.query(Log).order_by(Log.timestamp.desc()).offset(offset).limit(size).all()

    return LogsResponse(
        logs=[
            LogResponse(
                id=log.id,
                timestamp=log.timestamp,
                ip=log.ip,
                data=log.data
            ) for log in logs
        ],
        total=total
    )


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)