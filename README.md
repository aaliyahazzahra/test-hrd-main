# FSE Employee Management System

## [cite_start]1. Project Overview [cite: 115]

[cite_start]This is a full-stack web application designed to manage employee records, built as a test case for the FSE Internship assignment [cite: 1-5]. [cite_start]It demonstrates CRUD operations, API development, responsive UI design, and containerization practices[cite: 5, 120].

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