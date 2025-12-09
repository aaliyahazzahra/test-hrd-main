import { useEffect, useState } from "react";
import { getStatistics } from "../api/employeeApi"; 

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
  }

  const totalDepts = Object.keys(stats.employees_by_department).length;
  const salaries = Object.values(stats.average_salary_by_department);
  const highestSalary = salaries.length > 0 ? Math.max(...salaries) : 0;

  return (
    <div>
      <h3 className="mb-4 fw-bold text-secondary">Dashboard Overview</h3>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow border-0 h-100">
            <div className="card-body py-4">
              <h6 className="card-title text-uppercase opacity-75">Total Karyawan</h6>
              <h2 className="display-4 fw-bold mb-0">{stats.total_employees}</h2>
              <small>Data aktif saat ini</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success shadow border-0 h-100">
            <div className="card-body py-4">
              <h6 className="card-title text-uppercase opacity-75">Total Departemen</h6>
              <h2 className="display-4 fw-bold mb-0">{totalDepts}</h2>
              <small>Unit kerja terdaftar</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning shadow border-0 h-100">
            <div className="card-body py-4">
              <h6 className="card-title text-uppercase opacity-75 text-dark">Gaji Tertinggi (Avg)</h6>
              <h2 className="display-4 fw-bold mb-0 text-dark">${highestSalary.toLocaleString()}</h2>
              <small className="text-dark">Rata-rata per divisi</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-white border-bottom py-3">
                <h6 className="m-0 fw-bold text-primary">Distribusi Karyawan per Departemen</h6>
            </div>
            <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                {Object.entries(stats.employees_by_department).map(([dept, count]) => (
                    <li key={dept} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <span className="fw-medium">{dept}</span>
                    <span className="badge bg-primary rounded-pill px-3">{count} Staff</span>
                    </li>
                ))}
                {Object.keys(stats.employees_by_department).length === 0 && (
                    <li className="list-group-item text-center text-muted py-4">Data kosong</li>
                )}
                </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-white border-bottom py-3">
                <h6 className="m-0 fw-bold text-success">Rata-rata Gaji per Departemen</h6>
            </div>
            <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                {Object.entries(stats.average_salary_by_department).map(([dept, salary]) => (
                    <li key={dept} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <span className="fw-medium">{dept}</span>
                    <span className="fw-bold text-success">${salary.toLocaleString()}</span>
                    </li>
                ))}
                {Object.keys(stats.average_salary_by_department).length === 0 && (
                    <li className="list-group-item text-center text-muted py-4">Data kosong</li>
                )}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;