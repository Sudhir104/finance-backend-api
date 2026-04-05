#  Finance Management Backend API
A secure and scalable backend for managing financial records with **JWT authentication**, **role-based access control**, and **dashboard analytics**.

---

# Features

###  Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (Admin / Viewer)
* Protected routes via middleware

### Finance Management

* Create, update, delete financial records
* Fetch user-specific transactions
* Data isolation per user

### 📊 Dashboard & Analytics

* Total income, expenses, and balance
* Category-wise summary
* Recent transaction tracking

### Security & Validation

* Input validation and error handling
* Access restriction based on roles
* Secure handling of sensitive data

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT (Authentication)**

---

##  Installation

```bash
git clone https://github.com/YOUR_USERNAME/finance-backend-api.git
cd finance-backend-api
npm install
```

---

##  Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  Run the Server

```bash
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

##  API Endpoints

###  User APIs

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/user/register` | Register new user |
| POST   | `/api/user/login`    | Login user        |

---

###  Finance APIs (Protected)

> Add Header: `Authorization: Bearer YOUR_TOKEN`

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| POST   | `/api/finance`                  | Create record         |
| GET    | `/api/finance`                  | Get all records       |
| GET    | `/api/finance/summary`          | Get summary           |
| GET    | `/api/finance/category-summary` | Category summary      |
| PUT    | `/api/finance/:id`              | Update record (Admin) |
| DELETE | `/api/finance/:id`              | Delete record (Admin) |

---

## Error Handling

| Status Code | Meaning      |
| ----------- | ------------ |
| 400         | Bad Request  |
| 401         | Unauthorized |
| 403         | Forbidden    |
| 500         | Server Error |

---

##  Key Concepts

* REST API design
* Middleware (Auth & RBAC)
* MongoDB aggregation
* Secure token handling (JWT)

---

## Conclusion

This project demonstrates a complete backend system with authentication, role-based access, and financial data processing. It follows clean architecture and is designed for scalability and real-world use cases.

---

##  Author

**Sudhir Mathur**

---
