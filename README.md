# Employee Management & Payroll System

A full-stack enterprise web application designed to streamline employee data administration, department management, and automated payroll processing. This system features a robust **Spring Boot** backend paired with a modern, responsive **React (Vite + Tailwind CSS)** front-end.

---

## Features

* **Employee Lifecycle Management:** Add, update, view, and remove employee records, including personal details, roles, and departmental assignments.
* **Payroll Processing & Auditing:** Automated salary calculations, deductions, and financial record auditing.
* **Modern Responsive Interface:** Clean, high-performance UI built with React and Tailwind CSS for seamless navigation across devices.
* **RESTful API Backend:** Secure and scalable Java Spring Boot backend handling data persistence and business logic.
* **Database Integration:** Robust data storage managed via JPA/Hibernate and database repositories.

---

## Tech Stack

### Front-End (`employee-dashboard/`)
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Build Tool:** Vite

### Back-End (`demo/`)
* **Language:** Java (JDK 17+)
* **Framework:** Spring Boot, Spring Data JPA / Hibernate
* **Build Tool / Wrapper:** Maven (`mvnw`)
* **Database:** Relational Database (configured via `application.properties`)

---

## Project Structure

```text
AIP full/
│
├── demo/                           # Spring Boot Backend
│   ├── src/main/java/.../demo/     # Controllers, Models, Repositories
│   ├── src/main/resources/         # Application properties & configurations
│   ├── pom.xml                     # Maven project file
│   └── mvnw                        # Maven Wrapper script
│
├── employee-dashboard/             # React Front-End
│   ├── public/                     # Static assets and icons
│   ├── src/                        # Components, App.jsx, and CSS styles
│   ├── package.json                # Node dependencies and scripts
│   └── tailwind.config.js          # Tailwind styling configuration
│
└── README.md                       # Project documentation
