from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

# Base class for the ORM models
Base = declarative_base()

class EmployeeModel(Base):
    __tablename__ = 'employees'

    # Primary Key, Integer, Auto Increment
    id = Column(Integer, primary_key=True, index=True)

    # String, Required
    name = Column(String, nullable=False)

    # String, Unique, Required
    email = Column(String, unique=True, nullable=False)

    # String, Required
    position = Column(String, nullable=False)

    # String, Required
    department = Column(String, nullable=False)

    # Integer, Required
    salary = Column(Integer, nullable=False)

    # Date, Required
    hire_date = Column(Date, nullable=False)

    # String: 'active' or 'inactive', Default: 'active'
    status = Column(String, default='active', nullable=False)

    # Minimal representation for debugging/logging
    def __repr__(self):
        return f"<Employee(id={self.id}, name='{self.name}', status='{self.status}')>"