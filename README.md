# E-Gate Pass System

The **E-Gate Pass System** is a comprehensive platform designed to streamline gate pass management within educational institutions. It provides a multi-level approval workflow for students, teachers, guardians, hostel rectors, and security personnel, ensuring a secure and efficient process. Built with React Native, Node.js, MongoDB, and Redux Toolkit, it enables real-time tracking of gate pass requests while ensuring robust security through Role-Based Access Control (RBAC).

## Key Features
- **Multi-Level Approval Workflow:** Supports hierarchical approvals from teachers, Heads of Department (HODs), hostel rectors, and security officers.
- **Role-Based Access Control (RBAC):** Ensures users only access features and data relevant to their role.
- **Real-Time Request Tracking:** Allows users to monitor the status of their gate pass requests in real-time.
- **Cross-Platform Compatibility:** Developed with React Native for consistent performance across Android and iOS.

## Technology Stack
- **Frontend:** React Native
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **State Management:** Redux Toolkit
- **Authentication:** Passport.js with Local Strategy

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [React Native CLI](https://reactnative.dev/)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/e-gate-pass-system.git
   cd e-gate-pass-system

2. **Install dependencies for both client and server:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   
3. **Set up MongoDB**: Make sure MongoDB is running locally and configure the connection string in the backend server/config/db.js.

4. **Run the application:**</br>
In one terminal, run the backend:
    ```bash
    cd server
    npm start
In another terminal, run the frontend:

    cd client
    npm start

        
5. **Access the application:**

Frontend: http://localhost:3000
Backend: http://localhost:5000
