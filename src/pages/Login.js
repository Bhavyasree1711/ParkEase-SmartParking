import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("USER");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    /* ADMIN LOGIN */
    if (role === "ADMIN") {
      // create admin once (localStorage simulation)
      if (!localStorage.getItem("admin")) {
        localStorage.setItem(
          "admin",
          JSON.stringify({
            username: "admin",
            password: "admin123",
            role: "ADMIN",
          })
        );
      }

      const admin = JSON.parse(localStorage.getItem("admin"));

      if (id === admin.username && password === admin.password) {
        localStorage.setItem("role", "ADMIN");
        localStorage.setItem("token", "ADMIN_" + Date.now());
        navigate("/admin");
      } else {
        alert("Unauthorized Admin");
      }
      return;
    }

    /* USER LOGIN */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.vehicleNumber === id && u.password === password
    );

    if (!user) {
      alert("Invalid user credentials");
      return;
    }

    localStorage.setItem("role", "USER");
    localStorage.setItem("token", "USER_" + Date.now());
    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/slots");
  };

  return (
    <div className="login-card">
      <h2>Login</h2>

      {/* ROLE SELECTION */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">Standard User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <input
        placeholder={role === "ADMIN" ? "Admin Username" : "Vehicle Number"}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
