# ✅ To-Do App

A full-stack To-Do web application built with React and Node.js. Users can register, log in, and manage their personal tasks securely with JWT-based authentication.

## 🌐 Live Demo

| App      | URL                                                                                             |
|----------|-------------------------------------------------------------------------------------------------|
| Frontend | [deployed-to-do-app-client.onrender.com](https://deployed-to-do-app-client.onrender.com/)      |
| Backend  | [deployed-to-do-app-server.onrender.com](https://deployed-to-do-app-server.onrender.com/)      |

---

## 🗂️ Project Structure

```
deployed-to-do-app/
├── client/   # React frontend
└── server/   # Node.js + Express REST API
```

---

## ✨ Features

- User registration and login
- JWT-based authentication with secure cookies
- Create, read, update, and delete tasks
- Tasks are private and tied to each user account
- Persistent data storage with PostgreSQL

---

## 🛠️ Tech Stack

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | React 18, React Router, React Cookie, Axios |
| Backend  | Node.js, Express, PostgreSQL (pg)           |
| Auth     | JWT, Bcrypt, UUID                           |
| Config   | dotenv, CORS                                |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database (local or cloud)

---

### 1. Clone the Repository

```bash
git clone https://github.com/AabuUbaid/deployed-to-do-app.git
cd deployed-to-do-app
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
node server.js
```

The API will run on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

The app will run on `http://localhost:3000`

---

## 📁 Environment Variables

| Variable       | Description                        |
|----------------|------------------------------------|
| `PORT`         | Backend server port                |
| `DATABASE_URL` | PostgreSQL connection string       |
| `JWT_SECRET`   | Secret key for JWT tokens          |

---

## 📸 Screenshots

> *Coming soon*

---

## 🚀 Deployment

Both the frontend and backend are deployed on **Render**:

- **Frontend**: https://deployed-to-do-app-client.onrender.com/
- **Backend API**: https://deployed-to-do-app-server.onrender.com/
- **Database**: PostgreSQL (Render or Supabase)

---

## 👨‍💻 Author

**Abu Ubaid**  
[GitHub](https://github.com/AabuUbaid) • [Portfolio](https://aabuubaid.github.io/portfolio/)

---
