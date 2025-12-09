import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployeeById, updateEmployee } from "../api/employeeApi";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: 0,
    hire_date: new Date().toISOString().split('T')[0],
    status: "active"
  });

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
        const response = await getEmployeeById(id);
        setFormData(response.data);
    } catch (error) {
        alert("Data tidak ditemukan");
        navigate("/employees");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
        ...formData, 
        [name]: name === "salary" ? parseInt(value) || 0 : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate("/employees");
    } catch (error) {
      if (error.response) {
        const pesan = JSON.stringify(error.response.data.detail || error.response.data);
        alert(`Gagal menyimpan: \n${pesan}`);
      } else {
        alert("Terjadi kesalahan koneksi.");
      }
    }
  };

  return (
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white py-3">
                    <h5 className="mb-0 fw-bold">{id ? "Edit Data Karyawan" : "Form Karyawan Baru"}</h5>
                </div>
                <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Nama Lengkap</label>
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required disabled={!!id} placeholder="contoh@email.com" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Departemen</label>
                            <select name="department" className="form-select" value={formData.department} onChange={handleChange} required>
                                <option value="">Pilih Departemen...</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Product">Product</option>
                                <option value="Finance">Finance</option>
                                <option value="Analytics">Analytics</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Posisi / Jabatan</label>
                            <input type="text" name="position" className="form-control" value={formData.position} onChange={handleChange} required placeholder="Contoh: Staff, Manager" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Gaji Bulanan ($)</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input type="number" name="salary" className="form-control" value={formData.salary} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Tanggal Masuk</label>
                            <input type="date" name="hire_date" className="form-control" value={formData.hire_date} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    {id && (
                        <div className="mb-4">
                            <label className="form-label fw-bold">Status Kepegawaian</label>
                            <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                                <option value="active">Active (Aktif)</option>
                                <option value="inactive">Inactive (Tidak Aktif)</option>
                            </select>
                        </div>
                    )}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <button type="button" onClick={() => navigate("/employees")} className="btn btn-secondary px-4 me-md-2">Batal</button>
                        <button type="submit" className="btn btn-primary px-4">Simpan Data</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EmployeeForm;