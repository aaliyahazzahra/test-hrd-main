
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id          SERIAL PRIMARY KEY,

    name        VARCHAR(255) NOT NULL,

    email       VARCHAR(255) NOT NULL UNIQUE,

    position    VARCHAR(100) NOT NULL,

    department  VARCHAR(100) NOT NULL,

    salary      INTEGER NOT NULL CHECK (salary >= 0),

    hire_date   DATE NOT NULL,

    status      VARCHAR(10) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive'))
);

INSERT INTO employees (name, email, position, department, salary, hire_date, status) VALUES
('Alex Johnson', 'alex.johnson@corp.com', 'Software Engineer', 'Engineering', 95000, '2023-08-15', 'active'),
('Maria Rodriguez', 'maria.rodriguez@corp.com', 'Product Manager', 'Product', 110000, '2022-03-01', 'active'),
('David Lee', 'david.lee@corp.com', 'Data Analyst', 'Analytics', 80000, '2024-01-20', 'active'),
('Samantha Chan', 'samantha.chan@corp.com', 'HR Specialist', 'Human Resources', 70000, '2023-11-10', 'inactive'),
('Robert Green', 'robert.green@corp.com', 'Senior Developer', 'Engineering', 130000, '2021-05-25', 'active'),
('Emily White', 'emily.white@corp.com', 'Marketing Coordinator', 'Marketing', 65000, '2024-04-01', 'active');