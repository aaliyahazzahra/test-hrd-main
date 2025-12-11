import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'rgba(255, 176, 205, 0.2)' }}>
        {/* Navbar Full Width */}
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#FFB0CD' }} shadow-sm>
            <div className="container-fluid px-4">
                <Link className="navbar-brand fw-bold text-dark" to="/">Employee Management System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/">Dashboard</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/employees">Karyawan</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        {/* Konten Utama Full Width */}
        <div className="container-fluid px-4 py-4">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/add" element={<EmployeeForm />} />
                <Route path="/edit/:id" element={<EmployeeForm />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;