import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        ParkEase
      </h2>

      <div className="nav-links">
        {!role && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}

        {role === "USER" && (
          <>
            <button onClick={() => navigate("/slots")}>Slot Booking</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")}>Dashboard</button>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
