import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!localStorage.getItem("token") || !user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div className="profile-card">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Place:</strong> {user.place}</p>
      <p><strong>Vehicle Number:</strong> {user.vehicleNumber}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={() => navigate("/logout")}>Logout</button>
    </div>
  );
}
