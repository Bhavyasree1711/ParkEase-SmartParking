import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [parkingData, setParkingData] = useState({});
  const users = JSON.parse(localStorage.getItem("users")) || [];

  /* 🔐 ADMIN AUTH GUARD */
  useEffect(() => {
    if (
      localStorage.getItem("role") !== "ADMIN" ||
      !localStorage.getItem("token")
    ) {
      alert("Unauthorized access");
      navigate("/login");
    }
  }, [navigate]);

  /* LOAD PARKING DATA */
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("realtimeParking")) || {};
    setParkingData(data);
  }, []);

  /* SLOT STATS */
  const getStats = (places) => {
    let total = 0;
    let booked = 0;

    places.forEach((p) =>
      p.slots.forEach((s) => {
        total++;
        if (s.booked) booked++;
      })
    );

    return {
      total,
      booked,
      available: total - booked,
    };
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      {/* USERS */}
      <div className="admin-section">
        <h3>Registered Users</h3>
        <ul>
          {users.map((u, i) => (
            <li key={i}>
              {u.name} | {u.vehicleNumber} | {u.place}
            </li>
          ))}
        </ul>
      </div>

      {/* CITY-WISE ANALYTICS */}
      <div className="admin-section">
        <h3>Parking Analytics</h3>

        {Object.keys(parkingData).map((city) => {
          const stats = getStats(parkingData[city]);

          return (
            <div key={city} className="admin-card">
              <h4>{city}</h4>
              <p>Total Slots: {stats.total}</p>
              <p>Booked Slots: {stats.booked}</p>
              <p>Available Slots: {stats.available}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
