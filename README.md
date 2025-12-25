# 🚗 ParkEase – Smart Parking Slot Booking System

ParkEase is a role-based **Smart Parking Slot Booking System** designed to efficiently manage parking slots across cities and locations such as malls, hospitals, theatres, IT parks, and public places.  
The system provides **real-time slot availability**, **secure authentication**, and **admin analytics**, making it suitable for smart city applications.

---

## 🔗 Live Demo
👉 park-ease-smart-parking.vercel.app

---

## 📌 Features

### 👤 Standard User
- User Registration & Login
- Role-based authentication
- City and location-based parking slot selection
- Real-time parking slot availability
- Book parking slots
- View user profile
- Secure logout

### 🧑‍💼 Admin
- Authorized admin login (pre-registered)
- View registered users
- City-wise parking analytics
- View total, booked, and available slots
- Reset parking slots per city
- Secure admin-only access

---

## 🧠 System Architecture

**Frontend**
- React.js
- React Router
- CSS (component-level styling)

**State & Storage**
- LocalStorage (used as temporary database)
- Simulates backend persistence

**Future Backend (Planned)**
- Java Spring Boot
- REST APIs
- JWT Authentication
- Database (MySQL / MongoDB)

---

## 🔐 Authentication & Authorization

- Role-based login: **USER / ADMIN**
- Admin accounts are **pre-authorized** (no public registration)
- Token-based session handling using localStorage
- Protected routes for:
  - Slot Booking
  - User Profile
  - Admin Dashboard

---

## 🧾 Application Flow

1. **Home Page**
   - Public landing page
   - Options: Login, Register, Admin Login

2. **User Flow**
   - Register → Login → Slot Booking
   - Book parking slots in real time
   - View Profile
   - Logout

3. **Admin Flow**
   - Admin Login
   - Access Admin Dashboard
   - View analytics and registered users
   - Reset parking slots



## 🗂️ Project Structure

