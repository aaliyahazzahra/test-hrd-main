from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any, Optional

# Import Model Database dan Schema Pydantic
from ..database.models import EmployeeModel
from ..schemas.employee import EmployeeCreate, EmployeeUpdate

# --- FUNGSI UTAMA (CRUD) ---

def get_employee(db: Session, employee_id: int) -> Optional[EmployeeModel]:
    """Mengambil data satu karyawan berdasarkan ID."""
    return db.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()

def get_employee_by_email(db: Session, email: str) -> Optional[EmployeeModel]:
    """
    Cek apakah email sudah terdaftar. 
    Digunakan untuk validasi unik sebelum Create/Update.
    """
    return db.query(EmployeeModel).filter(EmployeeModel.email == email).first()

def get_employees(
    db: Session, 
    department: Optional[str] = None, 
    status: Optional[str] = None,
    search_query: Optional[str] = None, 
    skip: int = 0, 
    limit: int = 100
) -> List[EmployeeModel]:
    """
    Mengambil daftar karyawan dengan fitur Filter, Search, dan Pagination.
    """
    query = db.query(EmployeeModel)
    
    # 1. Filter by Department
    if department:
        query = query.filter(EmployeeModel.department == department)
    
    # 2. Filter by Status (active/inactive)
    if status:
        query = query.filter(EmployeeModel.status == status)

    # 3. Search Logic (Mencari nama atau posisi yang mirip)
    if search_query:
        search = f"%{search_query}%"
        query = query.filter(
            (EmployeeModel.name.ilike(search)) |
            (EmployeeModel.position.ilike(search)) |
            (EmployeeModel.department.ilike(search))
        )
        
    # 4. Pagination (Limit & Offset)
    return query.offset(skip).limit(limit).all()

def create_employee(db: Session, employee_data: EmployeeCreate) -> EmployeeModel:
    """Membuat karyawan baru."""
    # Konversi data Pydantic ke Dictionary
    db_employee = EmployeeModel(**employee_data.model_dump())
    
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee) # Refresh untuk mendapatkan ID yang baru digenerate
    return db_employee

def update_employee(db: Session, employee_id: int, employee_data: EmployeeUpdate) -> Optional[EmployeeModel]:
    """Update data karyawan yang sudah ada."""
    db_employee = get_employee(db, employee_id)
    
    if db_employee is None:
        return None

    # Update hanya field yang dikirim (exclude_unset=True)
    update_data = employee_data.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_employee, key, value)
        
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee_soft(db: Session, employee_id: int) -> Optional[EmployeeModel]:
    """
    Hard Delete: Menghapus data secara permanen dari database.
    """
    # 1. Cari dulu karyawannya
    db_employee = get_employee(db, employee_id)
    
    # 2. Kalau gak ada, return None
    if db_employee is None:
        return None
        
    # 3. HAPUS PERMANEN (Delete)
    db.delete(db_employee)
    
    # 4. Simpan Perubahan
    db.commit()
    
    return db_employee

# --- FUNGSI STATISTIK (Untuk Dashboard) ---

def get_employee_statistics(db: Session) -> Dict[str, Any]:
    """
    Menghitung total karyawan, per departemen, dan rata-rata gaji.
    """
    stats = {}
    
    # 1. Total Karyawan
    stats['total_employees'] = db.query(EmployeeModel).count()

    # 2. Jumlah Karyawan per Departemen
    employees_by_department = (
        db.query(EmployeeModel.department, func.count(EmployeeModel.id))
        .group_by(EmployeeModel.department)
        .all()
    )
    stats['employees_by_department'] = {
        dept: count for dept, count in employees_by_department
    }
    
    # 3. Rata-rata Gaji per Departemen
    average_salary_by_department = (
        db.query(EmployeeModel.department, func.avg(EmployeeModel.salary))
        .group_by(EmployeeModel.department)
        .all()
    )
    # Konversi hasil Decimal ke Integer/Float agar JSON serializable
    stats['average_salary_by_department'] = {
        dept: int(avg_salary) for dept, avg_salary in average_salary_by_department
    }

    return stats