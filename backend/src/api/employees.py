from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from src.database.models import EmployeeModel

# Import dependencies
from ..database.connection import get_db
from .. import services
from ..schemas.employee import Employee, EmployeeCreate, EmployeeUpdate

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.post("/", response_model=Employee, status_code=status.HTTP_201_CREATED)
def create_new_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    """
    Creates a new employee record.
    Input validation is handled automatically by Pydantic/FastAPI.
    """
    # Check for email uniqueness before creating (required for Unique constraint)
    if services.get_employee_by_email(db, email=employee.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )
    return services.create_employee(db=db, employee_data=employee)

@router.get("/", response_model=List[Employee])
def read_employees(
    department: Optional[str] = None, 
    status: Optional[str] = None,
    search: Optional[str] = None, # Bonus
    skip: int = 0,               # Bonus: Pagination
    limit: int = 100,            # Bonus: Pagination
    db: Session = Depends(get_db)
):
    """
    Get all employees with optional filtering by department/status, search, and pagination.
    """
    # Using the service function with filtering/pagination logic
    employees = services.get_employees(
        db, 
        department=department, 
        status=status,
        search_query=search,
        skip=skip,
        limit=limit
    )
    return employees

@router.get("/{employee_id}", response_model=Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    """Get employee by ID."""
    db_employee = services.get_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Employee not found."
        )
    return db_employee

@router.put("/{employee_id}", response_model=Employee)
def update_existing_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    """Update employee by ID."""
    db_employee = services.update_employee(db, employee_id=employee_id, employee_data=employee)
    if db_employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Employee not found."
        )
    return db_employee

@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee_by_id(employee_id: int, db: Session = Depends(get_db)):
    """Delete employee by ID (using hard delete or soft delete)."""
    
    # We choose soft delete implementation for the required DELETE operation (Bonus point used)
    # If the user requires a hard delete, they would implement delete_employee_hard instead.
    deleted_employee = services.delete_employee_soft(db, employee_id=employee_id)
    
    if deleted_employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Employee not found."
        )
    
    # Note: Returning 204 No Content means no body in the response
    return {"message": "Employee status updated to inactive (soft deleted)"}

# Additional Service function needed for email check in POST route
def get_employee_by_email(db: Session, email: str) -> Optional[EmployeeModel]:
    """Retrieves an employee by their email for uniqueness check."""
    return db.query(EmployeeModel).filter(EmployeeModel.email == email).first()

# Attach the helper function to the services module for cleaner import in the API route
services.get_employee_by_email = get_employee_by_email