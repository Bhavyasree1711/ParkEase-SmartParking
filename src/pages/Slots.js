import { useEffect, useState } from "react";
import API from "../services/api";

export default function Slots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    API.get("/slots").then((res) => setSlots(res.data));
  }, []);

  const book = (id) => {
    API.post("/bookings", {
      slotId: id,
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
    }).then(() => alert("Booked"));
  };

  return (
    <div>
      {slots.map((s) => (
        <div key={s._id}>
          {s.slotNumber} - {s.isBooked ? "Booked" : "Available"}
          {!s.isBooked && <button onClick={() => book(s._id)}>Book</button>}
        </div>
      ))}
    </div>
  );
}
