from datetime import date
from pydantic import BaseModel, EmailStr, Field

# Base schema for shared attributes (used for creation)
class EmployeeBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    position: str = Field(min_length=1, max_length=100)
    department: str = Field(min_length=1, max_length=100)
    salary: int = Field(ge=0) # ge=0 ensures positive salary (Part 3 requirement)
    hire_date: date
    status: str = 'active'

# Schema used for creating a new employee (POST request body)
class EmployeeCreate(EmployeeBase):
    pass

# Schema used for updating an existing employee (PUT request body)
class EmployeeUpdate(EmployeeBase):
    status: str = Field(default='active', pattern='^(active|inactive)$')

# Schema used for the API response (Output format, includes the ID)
class Employee(EmployeeBase):
    id: int
    
    class Config:
        # Enables ORM mode: Pydantic will read data from attributes 
        # (like those from SQLAlchemy) rather than just dictionary keys.
        from_attributes = True

# Schema for soft delete (Bonus point, updating status only)
class EmployeeStatusUpdate(BaseModel):
    status: str = Field(pattern='^(active|inactive)$')