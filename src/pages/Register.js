import React from "react";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    place: "",
    vehicleNumber: "",
    password: ""
  });

  const register = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ ...form, role: "USER" });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="register-card">
      <h2>Smart Parking Slot Booking System</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={register}>Register</button>
    </div>
  );
}
