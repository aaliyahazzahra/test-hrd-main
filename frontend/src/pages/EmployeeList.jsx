import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi"; 
import COLORS from "../constants/colors"; 

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

    const getDepartmentBadgeStyle = () => ({
        backgroundColor: COLORS.bgSecondaryLight,
        color: COLORS.textPrimary, 
        padding: '0.4em 0.8em',
        borderRadius: '5px'
    });

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Judul menggunakan textPrimary */}
                <h3 className="fw-bold m-0" style={{ color: COLORS.textPrimary }}>Manajemen Karyawan</h3>
                
                {/* Tombol Tambah Baru: Tetap Pink Primary */}
                <Link 
                    to="/add" 
                    className="btn shadow-sm px-4"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.textPrimary, fontWeight: 'bold' }}
                >
                    + Tambah Baru
                </Link>
            </div>

            {/* Kontainer Tabel: Card dengan shadow */}
            <div className="card shadow border-0" style={{ backgroundColor: COLORS.bgPrimary }}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            {/* Header Tabel */}
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
                            
                            {/* Body Tabel */}
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((emp) => (
                                    <tr key={emp.id}>
                                        {/* Nama Lengkap*/}
                                        <td className="ps-4 fw-bold" style={{ color: COLORS.textPrimary }}>{emp.name}</td>
                                        
                                        {/* Email*/}
                                        <td style={{ color: COLORS.textPrimary }}>{emp.email}</td>
                                        
                                        {/* Departemen*/}
                                        <td>
                                            <span 
                                                className="badge"
                                                style={getDepartmentBadgeStyle()}
                                            >
                                                {emp.department}
                                            </span>
                                        </td>
                                        
                                        {/* Posisi */}
                                        <td style={{ color: COLORS.textPrimary }}>{emp.position}</td>
                                        
                                        {/* Gaji */}
                                        <td style={{ color: COLORS.textPrimary }}>${emp.salary.toLocaleString()}</td>
                                        
                                        {/* Status: Rounded pill*/}
                                        <td>
                                            <span 
                                                className="badge rounded-pill px-3 py-2 text-uppercase" 
                                                style={{ 
                                                    backgroundColor: emp.status === 'active' ? COLORS.status.success : COLORS.status.danger, 
                                                    color: emp.status === 'active' ? COLORS.status.successText : COLORS.textLight, 
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {emp.status}
                                            </span>
                                        </td>
                                        
                                
                                        <td className="text-center">
                                            {/* Tombol Edit */}
                                            <Link 
                                                to={`/edit/${emp.id}`} 
                                                className="btn btn-sm me-2 fw-medium"
                                                style={{ 
                                                   
                                                    color: COLORS.textSecondary,
                                                    backgroundColor: 'transparent',
                                                    border: 'none' 
                                                }}
                                            >
                                                Edit
                                            </Link>
                                            
                                            {/* Tombol Hapus */}
                                            <button 
                                                onClick={() => handleDelete(emp.id)} 
                                                className="btn btn-sm fw-medium"
                                                style={{ 
                                                    color: COLORS.status.dangerText, 
                                                    backgroundColor: 'transparent',
                                                    border: 'none' 
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