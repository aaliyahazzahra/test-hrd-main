import { useEffect, useState } from "react";
import { getStatistics } from "../api/employeeApi";
import COLORS from "../constants/colors"; 
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
        <div
          className="spinner-border"
          role="status"
          style={{ color: COLORS.primary }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const totalDepts = Object.keys(stats.employees_by_department).length;
  const salaries = Object.values(stats.average_salary_by_department);
  const highestSalary = salaries.length > 0 ? Math.max(...salaries) : 0;

  const formatSalaryCard = (salary) => {
    return `$${salary.toLocaleString()}`;
  };

  const formatSalaryBadge = (salary) => {
    return `$${salary.toLocaleString()}`;
  };

  return (
    <div>
      {/* 1. Dashboard Overview Title */}
      <h3 className="mb-4 fw-bold" style={{ color: COLORS.textPrimary }}>
        Dashboard Overview
      </h3>

      {/* 2. Top Cards Section*/}
      <div className="row g-4 mb-5">
        {/* CARD 1: Total Karyawan */}
        <div className="col-md-4">
          <div
            className="card shadow-lg border-0 h-100" 
            style={{ backgroundColor: COLORS.bgSecondaryLight }}
          >
            <div className="card-body py-4" style={{ color: COLORS.textPrimary }}>
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <h6 className="card-title text-uppercase opacity-75">
                    TOTAL KARYAWAN
                  </h6>
                  <h2 className="display-4 fw-bold mb-0">
                    {stats.total_employees}
                  </h2>
                </div>
                <i className="bi bi-person-circle fs-1 opacity-50"></i>
              </div>
              <small className="opacity-75">Data aktif saat ini</small>
            </div>
          </div>
        </div>

        {/* CARD 2: Total Departemen */}
        <div className="col-md-4">
          <div
            className="card shadow-lg border-0 h-100"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="card-body py-4" style={{ color: COLORS.textPrimary }}>
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <h6 className="card-title text-uppercase opacity-75">
                    TOTAL DEPARTEMEN
                  </h6>
                  <h2 className="display-4 fw-bold mb-0">{totalDepts}</h2>
                </div>
                <i className="bi bi-building fs-1 opacity-75"></i>
              </div>
              <small className="opacity-75">Unit kerja terdaftar</small>
            </div>
          </div>
        </div>

        {/* CARD 3: Gaji Tertinggi (Avg) */}
        <div className="col-md-4">
          <div
            className="card shadow-lg border-0 h-100"
            style={{ backgroundColor: COLORS.info }}
          >
            <div className="card-body py-4" style={{ color: COLORS.textPrimary }}>
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <h6 className="card-title text-uppercase opacity-75">
                    GAJI TERTINGGI (AVG)
                  </h6>
                  <h2 className="display-4 fw-bold mb-0">
                    {formatSalaryCard(highestSalary)}
                  </h2>
                </div>
                <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
              </div>
              <small className="opacity-75">Rata-rata per divisi</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detail Lists Section*/}
      <div className="row g-4">
        {/* Kolom Kiri: Distribusi Karyawan */}
        <div className="col-lg-6">
          <h6 className="fw-bold mb-3" style={{ color: COLORS.textPrimary }}>
            Distribusi Karyawan per Departemen
          </h6>

          <div className="card border-0 shadow">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {Object.entries(stats.employees_by_department).map(
                  ([dept, count]) => (
                    <li
                      key={dept}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                      style={{ color: COLORS.textPrimary }}
                    >
                      <span className="fw-medium">{dept}</span>
                      <span
                        className="badge px-3 py-2"
                        style={{
                          backgroundColor: COLORS.bgSecondaryLight,
                          color: COLORS.textPrimary,
                          borderRadius: '8px'
                        }}
                      >
                        {count} Staff
                      </span>
                    </li>
                  )
                )}
                {Object.keys(stats.employees_by_department).length === 0 && (
                  <li className="list-group-item text-center text-muted py-4">
                    Data kosong
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rata-rata Gaji */}
        <div className="col-lg-6">
          <h6 className="fw-bold mb-3" style={{ color: COLORS.textPrimary }}>
            Rata-rata Gaji per Departemen
          </h6>

          <div className="card border-0 shadow">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {Object.entries(stats.average_salary_by_department).map(
                  ([dept, salary]) => (
                    <li
                      key={dept}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                      style={{ color: COLORS.textPrimary }}
                    >
                      <span className="fw-medium">{dept}</span>
                      <span
                        className="badge px-3 py-2"
                        style={{
                          color: COLORS.status.successText,
                          backgroundColor: COLORS.status.success,
                          borderRadius: '8px'
                        }}
                      >
                        {formatSalaryBadge(salary)}
                      </span>
                    </li>
                  )
                )}
                {Object.keys(stats.average_salary_by_department).length === 0 && (
                  <li className="list-group-item text-center text-muted py-4">
                    Data kosong
                  </li>
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