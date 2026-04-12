# 💸 Transactions API

A RESTful API for managing financial transactions.  
Built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- Create transactions
- Get all transactions
- Update transactions
- Delete transactions
- User authentication (JWT)
- Secure API endpoints

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT Authentication
- bcrypt (password hashing)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/transactions-api.git
cd transactions-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth

- POST /api/auth/register → Register user  
- POST /api/auth/login → Login user  

### Transactions

- GET /api/transactions → Get all transactions  
- POST /api/transactions → Create transaction  
- PUT /api/transactions/:id → Update transaction  
- DELETE /api/transactions/:id → Delete transaction  

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens).

Add token to headers:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 🧪 Testing

Use tools like:
- Postman
- Thunder Client (VS Code)

---

## 📄 API Documentation

Swagger docs available at:

```
http://localhost:5000/api-docs
```

---

## 📁 Project Structure

```
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── app.js
└── server.js
```

---

## 👨‍💻 Author

Ahmed Abdisalaam

---

## ⭐ Notes

- Make sure MongoDB Atlas is connected
- Keep your `.env` file private