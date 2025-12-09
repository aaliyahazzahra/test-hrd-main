# FSE Employee Management System

## [cite_start]1. Project Overview [cite: 115]

[cite_start]This is a full-stack web application designed to manage employee records, built as a test case for the FSE Internship assignment, made by Aaliyah [cite: 1-5]. [cite_start]It demonstrates CRUD operations, API development, responsive UI design, and containerization practices[cite: 5, 120].

### [cite_start]Technology Stack [cite: 119]

* [cite_start]**Backend API:** Python (FastAPI) [cite: 17, 18]
* [cite_start]**Frontend UI:** React (JavaScript) [cite: 23]
* [cite_start]**Database:** PostgreSQL [cite: 27]
* [cite_start]**Containerization:** Docker & Docker Compose [cite: 29]
* **Styling:** Custom CSS / Tailwind CSS (Placeholder)

### [cite_start]Features Implemented [cite: 120]

| Category | Feature | Status |
| :--- | :--- | :--- |
| **Data Management** | CRUD Operations (Create, Read, Update, Delete) | ✅ Implemented |
| **API** | RESTful API Endpoints | [cite_start]✅ Implemented [cite: 10] |
| **Frontend** | Responsive Employee List View | [cite_start]✅ Implemented [cite: 66, 91] |
| **Frontend** | Add/Edit Employee Form with Validation | [cite_start]✅ Implemented [cite: 75, 78] |
| **Database** | PostgreSQL Schema with constraints | [cite_start]✅ Implemented [cite: 31] |
| **Bonus** | Soft Delete (status update to 'inactive') | [cite_start]✅ Implemented [cite: 62] |
| **Bonus** | Search & Filtering (Name, Dept, Status) | [cite_start]✅ Implemented [cite: 61, 71] |
| **Bonus** | Dashboard/Statistics View | [cite_start]✅ Implemented [cite: 85] |

***

## 2. Prerequisites [cite: 121]

Ensure you have the following software installed on your system:

* **Git:** For cloning the repository.
* **Docker & Docker Compose:** **Mandatory** for running the application and database containers[cite: 122].

***

## 3. Installation & Setup [cite: 124]

The application can be run using a single Docker Compose command, ensuring all services start correctly[cite: 111].

### Step 1: Clone the Repository [cite: 126]
```bash
git clone <repository-url>
cd project-root
```

### Step 2: Configure Environment Variables [cite: 127]
```bash
cp .env.example .env
# Edit .env to set custom configurations if needed
```

### Step 3: Run with Docker Compose [cite: 128]
```bash
docker-compose up --build
```

### Step 4: Access the Application [cite: 129]
```bash
Once the containers are running (this may take a minute for the first build), you can access the application:

Frontend Web Interface: Open your browser to http://localhost:<FRONTEND_PORT> (The default port is typically defined in your .env file, e.g., 3000).

Backend API: The API is accessible at http://localhost:<BACKEND_PORT> (The default port is typically defined in your .env file, e.g., 8000).
```

### Step 5: Stopping the Application [cite: 130]
```bash
docker-compose down -v
```
## 4. API Documentation [cite: 131]
The backend exposes a RESTful API for all CRUD and statistics operations, using JSON for responses and adhering to proper HTTP status codes.
API Endpoints:
| Method | Endpoint | Description | HTTP Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/employees` | Get all employees (supports filtering by **department** or **status**, and pagination/search) | 200, 400, 500 |
| **GET** | `/api/employees/:id` | Get employee by ID | 200, 404, 500 |
| **POST** | `/api/employees` | Create a new employee (**requires input validation**) | 201, 400, 500 |
| **PUT** | `/api/employees/:id` | Update employee by ID (**requires input validation**) | 200, 400, 404, 500 |
| **DELETE** | `/api/employees/:id` | Delete employee by ID (Implemented as a **Soft Delete**) | 200, 404, 500 |
| **GET** | `/api/stats` | Get statistics (total employees, by department, average salary) | 200, 500 |

## 5. Project Structure [cite: 123]
The repository follows a standard full-stack, monorepo-style structure, designed to separate the backend, frontend, and database concerns for clarity and maintainability.

```
test-hrd-main/
├── backend/                  # FastAPI/Python application source
│   ├── src/                  # Application code (models, services, routes)
│   ├── Dockerfile            # Docker configuration for the backend service
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React application source
│   ├── src/                  # Component source code
│   ├── public/               # Static assets
│   ├── Dockerfile            # Docker configuration for the frontend service
│   └── package.json          # Node/React dependencies
├── database/                 # Database initialization scripts
│   └── init.sql              # SQL script to create table and insert sample data [cite: 46, 47, 165]
├── docker-compose.yml        # Orchestrates the multi-container application [cite: 105]
├── .env.example              # Template for environment variables 
├── README.md                 # This documentation file [cite: 114]
└── screenshots/              # Folder for UI screenshots [cite: 137]
```

## 6. Screenshots [cite: 136]
Screenshots of the application UI can be found in the `screenshots/` directory.

## 7. Challenge and Solution [cite: 133]

Challenge: Ensuring Database Initialization on Startup
When using Docker Compose, the application container often starts faster than the PostgreSQL container, leading to connection errors.

Solution: Implemented a simple health-check or wait-for-db mechanism within the docker-compose.yml (or a separate entrypoint script) to delay the application container's startup until the PostgreSQL service is confirmed to be running and accepting connections.

Challenge: Implementing Soft Delete
The requirement was to implement a soft delete (updating status to 'inactive') instead of actual deletion. This required careful handling of the DELETE API endpoint.

Solution: The DELETE /api/employees/:id endpoint was modified on the backend to execute a PUT operation internally, updating the status field to 'inactive' instead of running a DELETE SQL command. The frontend was updated to display a confirmation dialog before initiating this action.

## 8. Future Improvements [cite: 134]
Given more time, the following features would be implemented to enhance the system:

Authentication & Authorization: Implement user login, roles (e.g., Admin, HR), and protect API routes.

Detailed Employee Audit Logs: Track changes (who, when, what) made to employee records.

Advanced Filtering: Add filtering options for salary range or hire_date range.

Full End-to-End Testing: Implement Jest/React Testing Library for the frontend and Pytest for the backend, along with Cypress for E2E tests.

Dedicated Hosting: Deploy the application to a cloud service (e.g., AWS ECS, Google Cloud Run) using a CI/CD pipeline.
