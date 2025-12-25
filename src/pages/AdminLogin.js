import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // create admin once
    if (!localStorage.getItem("admin")) {
      localStorage.setItem(
        "admin",
        JSON.stringify({
          username: "admin",
          password: "admin123",
          role: "ADMIN"
        })
      );
    }

    const admin = JSON.parse(localStorage.getItem("admin"));

    if (username === admin.username && password === admin.password) {
      localStorage.setItem("token", "ADMIN_" + Date.now());
      localStorage.setItem("role", "ADMIN");
      navigate("/admin");
    } else {
      alert("Unauthorized admin");
    }
  };

  return (
    <div className="login-card">
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
