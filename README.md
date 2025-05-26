# CV Maker Application

A full-stack web application for creating and managing CVs/resumes. Built with React, Node.js, Express, and MySQL.

## Features

- User authentication (register/login)
- Create and manage multiple CVs
- Modern, responsive UI
- Secure password hashing
- JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cvmaker
```

2. Set up the database:
- Create a MySQL database named 'cvmaker'
- Run the following SQL commands to create the necessary tables:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE cvs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    education TEXT,
    experience TEXT,
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Install frontend dependencies:
```bash
cd ..
npm install
```

5. Update the database configuration in `backend/server.js` with your MySQL credentials.

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
# In a new terminal
cd cvmaker
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Register a new account or login with existing credentials
2. Create a new CV by filling out the form on the dashboard
3. View and manage your CVs in the dashboard

## Security Features

- Passwords are hashed using bcrypt
- JWT-based authentication
- Protected API endpoints
- SQL injection prevention
- CORS enabled

## Technologies Used

- Frontend:
  - React
  - React Router
  - Axios
  - CSS3

- Backend:
  - Node.js
  - Express
  - MySQL
  - JWT
  - Bcrypt

## License

MIT
