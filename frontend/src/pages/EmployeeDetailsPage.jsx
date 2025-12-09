import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as employeeApi from '../api/employeeApi';

import COLORS from "../colors"; 

const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(51, 51, 51, 0.75)' }}>
            <div className="p-6 rounded shadow-lg w-96" style={{ backgroundColor: COLORS.bgPrimary, color: COLORS.textPrimary }}>
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 rounded"
                        style={{ backgroundColor: COLORS.bgLight, color: COLORS.textPrimary }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 rounded"
                        style={{ backgroundColor: COLORS.danger, color: COLORS.textLight }}
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmployeeDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteCandidateId, setDeleteCandidateId] = useState(null);

    // --- Fetch Data ---
    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const response = await employeeApi.getEmployeeById(id);
                setEmployee(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError("Employee not found.");
                } else {
                    setError("Failed to load employee details.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    // --- Soft Delete Logic (Reused from List Page) ---
    const handleInitiateDelete = () => {
        setDeleteCandidateId(employee.id);
    };

    const handleConfirmDelete = async () => {
        setDeleteCandidateId(null); 
        try {
            await employeeApi.deleteEmployee(employee.id);
           
            navigate('/employees', { state: { toastMessage: 'Employee status updated to inactive.' } });
        } catch (err) {
            console.error("Delete failed:", err);
            
        }
    };
    
    const handleCancelDelete = () => {
        setDeleteCandidateId(null);
    };

    // --- Render Logic ---
    if (loading) return <div className="text-center py-8" style={{ color: COLORS.textSecondary }}>Loading Employee Details...</div>;
    if (error) return <div className="text-center py-8" style={{ color: COLORS.danger }}>{error}</div>; // text-red-600 -> danger
    if (!employee) return null;

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg" style={{ backgroundColor: COLORS.bgPrimary }}>
            
            <nav className="text-sm font-medium mb-4" style={{ color: COLORS.textSecondary }}>
                <span onClick={() => navigate('/employees')} className="cursor-pointer" style={{ color: COLORS.primary }}>
                    Employee List
                </span> 
                {' / '}
                <span>{employee.name}</span>
            </nav>

            <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>{employee.name}</h2>
            
          
            <div className="flex space-x-3 mb-6">
                <button
                    onClick={() => navigate(`/employees/edit/${employee.id}`)}
                    className="px-4 py-2 text-white rounded"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.textLight }}
                >
                    Edit Employee
                </button>
                <button
                    onClick={handleInitiateDelete}
                    className="px-4 py-2 text-white rounded"
                    style={{ backgroundColor: COLORS.danger, color: COLORS.textLight }}
                >
                    Delete (Set Inactive)
                </button>
            </div>

       
            <div className="border-t" style={{ borderColor: COLORS.bgLight }}>
                <dl className="divide-y" style={{ borderColor: COLORS.bgLight }}>
                    
                    {/* ID */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Employee ID</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>{employee.id}</dd>
                    </div>
                    {/* Email */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Email Address</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>{employee.email}</dd>
                    </div>
                    {/* Position */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Position</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>{employee.position}</dd>
                    </div>
                    {/* Department */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Department</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>{employee.department}</dd>
                    </div>
                    {/* Salary */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Salary</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>${employee.salary.toLocaleString('en-US')}</dd>
                    </div>
                    {/* Hire Date */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Hire Date</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: COLORS.textPrimary }}>{new Date(employee.hire_date).toLocaleDateString('en-US')}</dd>
                    </div>
                    {/* Status */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Status</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                                style={{
                                    backgroundColor: employee.status === 'active' ? COLORS.status.success : COLORS.danger,
                                    color: employee.status === 'active' ? COLORS.status.successText : COLORS.textLight,
                                }}
                            >
                                {employee.status.toUpperCase()}
                            </span>
                        </dd>
                    </div>
                </dl>
            </div>
            
            <ConfirmationDialog
                isOpen={!!deleteCandidateId}
                title="Confirm Soft Delete"
                message={`Are you sure you want to mark ${employee.name} as inactive?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default EmployeeDetailsPage;