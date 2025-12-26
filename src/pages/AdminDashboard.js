import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [parkingData, setParkingData] = useState({});
  const [users, setUsers] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  /* 🔐 ADMIN AUTH CHECK */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      alert("Unauthorized access");
      navigate("/");
    }
  }, [navigate]);

  /* 🔄 LOAD OR INITIALIZE DATA */
  useEffect(() => {
    /* PARKING DATA */
    const parking = localStorage.getItem("realtimeParking");
    if (parking) {
      setParkingData(JSON.parse(parking));
    } else {
      setParkingData({});
    }

    /* USER DATA (SELF INIT IF MISSING) */
    let storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      const defaultUsers = [
        {
          id: 1,
          name: "Admin",
          email: "admin@parkease.com",
          vehicleNumber: "ADMIN001",
          role: "ADMIN",
        },
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    } else {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  /* 📊 GLOBAL STATS */
  let totalCities = Object.keys(parkingData).length;
  let totalPlaces = 0;
  let totalSlots = 0;
  let bookedSlots = 0;

  Object.values(parkingData).forEach((places) => {
    totalPlaces += places.length;
    places.forEach((place) => {
      totalSlots += place.slots.length;
      bookedSlots += place.slots.filter((s) => s.booked).length;
    });
  });

  const availableSlots = totalSlots - bookedSlots;

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <span className="back-arrow" onClick={() => navigate("/")}>←</span>
        <h2>Admin Dashboard</h2>
      </div>

      {/* METRICS */}
      <div className="card-grid">
        <DashboardCard title="Cities" value={totalCities} />
        <DashboardCard title="Locations" value={totalPlaces} />
        <DashboardCard title="Total Slots" value={totalSlots} />
        <DashboardCard title="Booked Slots" value={bookedSlots} />
        <DashboardCard title="Available Slots" value={availableSlots} />
        <DashboardCard title="Users" value={users.length} />
      </div>

      {/* CITY-WISE ANALYTICS */}
      <section className="admin-section">
        <h3>City-wise Parking Analytics</h3>

        {Object.keys(parkingData).length === 0 && (
          <p>No parking data available</p>
        )}

        {Object.keys(parkingData).map((city) => (
          <div key={city} className="city-card">
            <div
              className="city-header"
              onClick={() =>
                setActiveCity(activeCity === city ? null : city)
              }
            >
              <strong>{city}</strong>
              <span>{activeCity === city ? "▲" : "▼"}</span>
            </div>

            {activeCity === city &&
              parkingData[city].map((place) => {
                const booked = place.slots.filter((s) => s.booked).length;
                return (
                  <div key={place.id} className="place-row">
                    <span>{place.name}</span>
                    <span>
                      {booked}/{place.slots.length} booked
                    </span>
                  </div>
                );
              })}
          </div>
        ))}
      </section>

      {/* USER MANAGEMENT */}
      <section className="admin-section">
        <h3>Registered Users</h3>

        {users.length === 0 && <p>No users registered</p>}

        {users.map((user) => (
          <div
            key={user.id}
            className="user-row"
            onClick={() => setActiveUser(user)}
          >
            <span>{user.name}</span>
            <span>{user.role}</span>
          </div>
        ))}
      </section>

      {/* USER PROFILE MODAL */}
      {activeUser && (
        <div className="modal-overlay" onClick={() => setActiveUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>User Profile</h3>
            <p><b>Name:</b> {activeUser.name}</p>
            <p><b>Email:</b> {activeUser.email}</p>
            <p><b>Vehicle:</b> {activeUser.vehicleNumber}</p>
            <p><b>Role:</b> {activeUser.role}</p>

            <button onClick={() => setActiveUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔹 DASHBOARD CARD */
function DashboardCard({ title, value }) {
  return (
    <div className="admin-card">
      <h1>{value}</h1>
      <p>{title}</p>
    </div>
  );
}
