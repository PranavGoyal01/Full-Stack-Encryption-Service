# SecureLog Encryption Service

## Overview

SecureLog is a full-stack encryption service that provides Caesar cipher encryption/decryption with comprehensive logging. The application encrypts and decrypts data using a shift key and maintains a paginated log of all operations.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Docker Compose                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │    Web       │      │   Server     │      │   Database   │   │
│  │   (NGINX)    │─────▶│  (FastAPI)   │─────▶│ (PostgreSQL)│   │
│  │   Port 80    │      │  Port 8000   │      │  Port 5432   │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│         │                      │                      │         │
│    React App            Caesar Cipher           Logs Table      │
│    Material-UI          SQLAlchemy              (id, timestamp, │
│    Axios Client         Pydantic Schemas         ip, data)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Request Flow:
1. User interacts with React UI (Encrypt/Decrypt/Logs pages)
2. Frontend sends HTTP request to FastAPI backend
3. Backend processes encryption/decryption using Caesar cipher
4. Backend logs operation to PostgreSQL database
5. Backend returns result to frontend
6. Frontend displays result to user
```

## Technology Stack

-   **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Python 3.10
-   **Frontend**: React, Material-UI, Axios
-   **DevOps**: Docker, Docker Compose, NGINX, GitHub Actions

## Installation and Setup

### Using Docker Compose

```bash
# Clone the repository
git clone <repository-url>
cd challenge

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# API: http://localhost:8000
# API Docs: http://localhost:8000/docs

# Stop services
docker-compose down
```

## API Endpoints

### POST /api/v1/encrypt

Encrypts data using Caesar cipher.

```json
Request:  { "key": "3", "data": "Hello World" }
Response: { "data": "Khoor Zruog" }
```

### POST /api/v1/decrypt

Decrypts Caesar cipher encrypted data.

```json
Request:  { "key": "3", "data": "Khoor Zruog" }
Response: { "data": "Hello World" }
```

### GET /api/v1/logs?size=10&offset=0

Retrieves paginated logs of operations.

```json
Response: {
  "logs": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "timestamp": 1697040000,
      "ip": "172.18.0.1",
      "data": "encrypt"
    }
  ],
  "total": 42
}
```

## Project Structure

```
challenge/
├── docker-compose.yml          # Multi-container orchestration
├── README.md                   # This file
│
├── .github/
│   └── workflows/
│       ├── web-lint.yml        # Frontend linting workflow
│       └── server-lint.yml     # Backend linting workflow
│
├── server/                     # Backend FastAPI application
│   ├── Dockerfile              # Backend container definition
│   ├── requirements.txt        # Python dependencies
│   └── src/
│       └── app/
│           ├── __init__.py
│           ├── main.py         # API endpoints and app setup
│           ├── models.py       # Database models
│           ├── schemas.py      # Pydantic schemas
│           ├── database.py     # Database connection
│           └── crypto.py       # Encryption/decryption logic
│
└── web/                        # Frontend React application
    ├── Dockerfile              # Frontend container definition
    ├── nginx.conf              # NGINX configuration
    ├── package.json            # Node dependencies
    ├── package-lock.json
    ├── public/                 # Static assets
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.js              # Main application component
        ├── index.js            # Application entry point
        ├── components/
        │   └── Navbar.js       # Navigation bar
        ├── pages/
        │   ├── HomePage.js     # Landing page
        │   ├── EncryptPage.js  # Encryption interface
        │   ├── DecryptPage.js  # Decryption interface
        │   └── LogsPage.js     # Logs viewer
        └── services/
            └── api.js          # API client functions
```

## Services

### Database (`db`)

-   PostgreSQL 13 on port 5432
-   Stores logs with id (UUID), timestamp (UNIX), ip, and operation type

### Backend (`server`)

-   FastAPI server on port 8000
-   Handles encryption/decryption and logging

### Frontend (`web`)

-   React application served by NGINX on port 80
-   Provides UI for encrypt, decrypt, and logs pages

## CI/CD

GitHub Actions workflows lint code on every push:

-   `/.github/workflows/web-lint.yml` - ESLint for frontend
-   `/.github/workflows/server-lint.yml` - Flake8 for backend
