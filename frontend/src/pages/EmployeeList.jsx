import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi"; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Hapus data ini secara permanen?")) {
        try {
            await deleteEmployee(id);
            loadData();
        } catch (error) {
            alert("Gagal menghapus");
        }
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-secondary m-0">Manajemen Karyawan</h3>
        <Link to="/add" className="btn btn-primary shadow-sm px-4">
            + Tambah Baru
        </Link>
      </div>

      <div className="card shadow border-0">
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4 border-0">Nama Lengkap</th>
                            <th className="py-3 border-0">Email</th>
                            <th className="py-3 border-0">Departemen</th>
                            <th className="py-3 border-0">Posisi</th>
                            <th className="py-3 border-0">Gaji</th>
                            <th className="py-3 border-0">Status</th>
                            <th className="py-3 border-0 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="ps-4 fw-bold">{emp.name}</td>
                                <td>{emp.email}</td>
                                <td><span className="badge bg-light text-dark border">{emp.department}</span></td>
                                <td>{emp.position}</td>
                                <td>${emp.salary.toLocaleString()}</td>
                                <td>
                                    <span className={`badge rounded-pill ${emp.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-outline-warning me-2">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-muted">
                                    Belum ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;