# 🛒 Nest Cart — MERN E-commerce Platform

Nest Cart is a full-stack e-commerce application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It includes separate services for users, admins, and backend APIs, along with **Razorpay payment integration** and **Cloudinary-based image management**.

---

## 🏗️ Architecture Overview

```
Client (React)  --->  
                     \
                      ---> Server (Node.js + Express + MongoDB)
                     /
Admin (React)   --->  

Server ---> Razorpay API (Payments)  
Server ---> Cloudinary (Image Storage)
```

---

## ☁️ Deployment

The application is deployed using **AWS EC2**, demonstrating experience in cloud-based deployment and server management.

---

## 📦 Services

### 🧑‍💻 Client (User App)

* Browse products
* Add to cart
* Checkout and place orders
* Razorpay payment integration
* User authentication

---

### 🛠️ Admin Dashboard

* Add / edit / delete products
* Upload product images
* Manage categories
* View and manage orders
* Manage users

---

### ⚙️ Server (Backend API)

* REST API for client & admin
* JWT-based authentication
* MongoDB database management
* Razorpay payment processing
* Cloudinary integration for image upload & storage
* Order handling

---

## 🔐 Environment Variables

Each service requires its own `.env` configuration.

---

### 📁 Server `.env`

```
PORT=8000

# Database
MONGO_URI=mongodb://localhost:27017/nestcart

# Authentication
ACCESS_SECRET_KEY = your_access_secret_key
REFRESH_SECRET_KEY = your_refresh_secret_key

# Razorpay
RAZORPAY_KEY_ID = your_key_id
RAZORPAY_KEY_SECRET = your_key_secret

# Cloudinary
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_KEY = your_cloudinary_key
CLOUDINARY_SECRET = your_cloudinary_secret

# CORS
ALLOWED_ORIGINS = http://localhost:5173 http://localhost:5174
```

---

### 🌐 Client `.env`

```
VITE_API_URL = http://localhost:8000/api
VITE_RAZORPAY_KEY_ID = your_key_id
```

---

### 🛠️ Admin `.env`

```
VITE_API_URL = http://localhost:8000/api
```

---

## 💳 Razorpay Integration Flow

1. User clicks **Pay Now**
2. Client sends request to backend
3. Server creates a Razorpay order
4. Client opens Razorpay checkout
5. User completes payment
6. Order is stored in database

---

## 🖼️ Image Upload Flow (Cloudinary)

1. Admin uploads product image
2. Image is sent to backend
3. Server uploads image to Cloudinary
4. Cloudinary returns image URL
5. URL is stored in MongoDB
6. Client fetches and displays image via URL

---

## 🚀 Getting Started

### 1. Clone Repository

```
git clone <repo-url>
cd nest-cart
```

---

### 2. Install Dependencies

```
cd client
npm install

cd ../admin
npm install

cd ../server
npm install
```

---

### 3. Setup Environment Variables

Create `.env` files in:

* `/client`
* `/admin`
* `/server`

Use the examples provided above.

---

### 4. Run the Application

```
# Run Server
cd server
npm run dev

# Run Client
cd client
npm run dev

# Run Admin
cd admin
npm run dev
```

---

## 📌 Features

* 🔐 JWT Authentication
* 🛒 Cart & Checkout System
* 💳 Razorpay Payment Gateway
* 🖼️ Cloudinary Image Upload
* 📦 Order Management
* 📊 Admin Dashboard
* 🔎 Product Search

---

## 🧠 Tech Stack

* **Frontend:** React, Axios, React Router, React Query
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Payments:** Razorpay
* **Image Storage:** Cloudinary
* **Deployment:** AWS EC2

---

## ⚠️ Notes

* Do not expose `RAZORPAY_KEY_SECRET` or `CLOUDINARY_API_SECRET` in frontend and backend
* Store sensitive data in `.env` files
* Configure CORS properly
* Use HTTPS in production

---

## 📄 License

This project is licensed under the MIT License.
