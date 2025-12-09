import api from './axiosConfig'; // Import konfigurasi dari file sebelah

// --- Employee Operations ---

export const getEmployees = (params = {}) => {
    // params bisa berisi: { search: "nama", department: "IT" }
    return api.get('/employees/', { params });
};

export const getEmployeeById = (id) => {
    return api.get(`/employees/${id}`);
};

export const createEmployee = (employeeData) => {
    return api.post('/employees/', employeeData);
};

export const updateEmployee = (id, employeeData) => {
    return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
    return api.delete(`/employees/${id}`);
};

// --- Statistics Operation ---

export const getStatistics = () => {
    return api.get('/stats/');
};