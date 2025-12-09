from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from ..database.connection import get_db
from .. import services

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"]
)

@router.get("/", response_model=Dict[str, Any])
def get_statistics(db: Session = Depends(get_db)):
    """
    Get statistics: total employees, by department, and average salary.
    """
    return services.get_employee_statistics(db)