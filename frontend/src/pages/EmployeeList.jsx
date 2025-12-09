import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi"; 
import COLORS from "../colors"; 

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
        <h3 className="fw-bold m-0" style={{ color: COLORS.textSecondary }}>Manajemen Karyawan</h3>
        <Link 
            to="/add" 
            className="btn shadow-sm px-4"
            style={{ backgroundColor: COLORS.primary, color: COLORS.textLight }}
        >
            + Tambah Baru
        </Link>
      </div>

      <div className="card shadow border-0" style={{ backgroundColor: COLORS.bgPrimary }}>
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover table-striped align-middle mb-0">
                    <thead 
                        style={{ backgroundColor: COLORS.bgLight }}
                    >
                        <tr style={{ color: COLORS.textPrimary }}>
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
                                <td className="ps-4 fw-bold" style={{ color: COLORS.textPrimary }}>{emp.name}</td>
                                <td style={{ color: COLORS.textPrimary }}>{emp.email}</td>
                                <td>
                                    <span 
                                        className="badge border" 
                                        style={{ backgroundColor: COLORS.bgLight, color: COLORS.textPrimary }}
                                    >
                                        {emp.department}
                                    </span>
                                </td>
                                <td style={{ color: COLORS.textPrimary }}>{emp.position}</td>
                                <td style={{ color: COLORS.textPrimary }}>${emp.salary.toLocaleString()}</td>
                                <td>
                                    <span 
                                            className="badge rounded-pill" 
                                            style={{ 
                                                backgroundColor: emp.status === 'active' ? COLORS.status.success : COLORS.danger,
                                                color: emp.status === 'active' ? COLORS.status.successText : COLORS.textLight
                                            }}
                                        >
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <Link 
                                            to={`/edit/${emp.id}`} 
                                            className="btn btn-sm me-2"
                                            style={{ 
                                                borderColor: COLORS.warning, 
                                                color: COLORS.warning,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                        Edit
                                    </Link>
                                    <button 
                                            onClick={() => handleDelete(emp.id)} 
                                            className="btn btn-sm"
                                            style={{ 
                                                borderColor: COLORS.danger, 
                                                color: COLORS.danger,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td 
                                    colSpan="7" 
                                    className="text-center py-5" 
                                    style={{ color: COLORS.textSecondary }}
                                >
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