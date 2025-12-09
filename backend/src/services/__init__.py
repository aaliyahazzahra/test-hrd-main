# backend/src/services/__init__.py

from .employee_service import (
    get_employee,
    get_employees,
    create_employee,
    update_employee,
    delete_employee_soft,
    get_employee_statistics,
    get_employee_by_email
)