import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>ParkEase</h1>
        <h2>Smart Parking Slot Booking System</h2>

        <p>
          Welcome to ParkEase — a smart solution to find, book, and manage
          parking slots in real time across cities, malls, hospitals, IT parks,
          theatres, and public locations.
        </p>

        {/* USER ACTIONS */}
        <div className="hero-buttons">
          {/* Guest */}
          {!role && (
            <>
              <button
                className="primary-btn"
                onClick={() => navigate("/login")}
              >
                User Login
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}

          {/* Logged-in User */}
          {role === "USER" && (
            <>
              <button
                className="primary-btn"
                onClick={() => navigate("/slots")}
              >
                Book Parking Slot
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </button>
            </>
          )}
        </div>

        {/* ADMIN LOGIN (GUEST ONLY) */}
        {!role && (
          <p className="admin-link" onClick={() => navigate("/admin-login")}>
            Admin Login
          </p>
        )}
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <h3>Why Choose ParkEase?</h3>

        <div className="features">
          <div className="feature-card">
            <h4>🚗 Real-Time Parking</h4>
            <p>
              Instantly check live availability of parking slots before arriving
              at your destination.
            </p>
          </div>

          <div className="feature-card">
            <h4>📍 Location-Based Booking</h4>
            <p>
              Select city, area, and parking-enabled places like malls,
              hospitals, theatres, and IT parks.
            </p>
          </div>

          <div className="feature-card">
            <h4>🔐 Secure Authentication</h4>
            <p>
              Role-based access ensures secure booking for users and controlled
              management for administrators.
            </p>
          </div>

          <div className="feature-card">
            <h4>📊 Admin Analytics</h4>
            <p>
              Administrators can monitor bookings, availability, and reset
              parking slots city-wise.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2025 ParkEase Smart Parking System</p>
        <p>Designed for Smart City Parking Management</p>
      </footer>
    </div>
  );
}
