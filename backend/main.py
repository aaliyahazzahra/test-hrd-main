from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

load_dotenv()

# Import routers
from src.api import employees, stats

# Create the main FastAPI application instance
app = FastAPI(
    title="FSE Employee Management API",
    description="RESTful API for managing employee records.",
    version="1.0.0"
)

# CORS Configuration (Required for frontend communication)
# Allow requests from all origins during development
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers to activate the endpoints
app.include_router(employees.router, prefix="/api")
app.include_router(stats.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Employee Management API is running! Access /docs for API documentation."}