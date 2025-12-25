import "./SlotBooking.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SlotBooking() {
  const navigate = useNavigate();

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  /* ✅ SLOT GENERATOR (MUST BE FIRST) */
  function createSlots(n) {
    return Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      booked: false,
    }));
  }

  /* 🔴 REAL-WORLD PARKING DATA */
  const initialData = {
    Bangalore: [
      {
        id: 1,
        name: "Orion Mall",
        type: "Shopping Mall",
        slots: createSlots(10),
      },
      {
        id: 2,
        name: "Apollo Hospital",
        type: "Hospital",
        slots: createSlots(8),
      },
      {
        id: 3,
        name: "PVR Cinemas",
        type: "Theatre",
        slots: createSlots(6),
      },
      {
        id: 4,
        name: "Manyata Tech Park",
        type: "IT Park",
        slots: createSlots(12),
      },
    ],
    Chennai: [
      {
        id: 1,
        name: "Phoenix Mall",
        type: "Shopping Mall",
        slots: createSlots(9),
      },
      {
        id: 2,
        name: "MIOT Hospital",
        type: "Hospital",
        slots: createSlots(7),
      },
    ],
  };

  /* 🔐 LOAD DATA */
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("realtimeParking");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [city, setCity] = useState("Bangalore");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* 💾 SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("realtimeParking", JSON.stringify(data));
  }, [data]);

  /* 🔄 LIVE COUNTS */
  const getCounts = (slots) => {
    const booked = slots.filter((s) => s.booked).length;
    return {
      total: slots.length,
      booked,
      available: slots.length - booked,
    };
  };

  /* 🚗 BOOK SLOT */
  const bookSlot = () => {
    if (!selectedSlot) {
      alert("Select a slot");
      return;
    }

    setData((prev) => ({
      ...prev,
      [city]: prev[city].map((place) =>
        place.id === selectedPlace.id
          ? {
              ...place,
              slots: place.slots.map((s) =>
                s.id === selectedSlot ? { ...s, booked: true } : s
              ),
            }
          : place
      ),
    }));

    alert("Slot booked successfully");
    setSelectedSlot(null);
  };

  return (
    <div className="slot-page">
      <div className="slot-header">
        <span className="back-arrow" onClick={() => navigate("/")}>←</span>
        <h3>Smart Parking</h3>
      </div>

      {/* CITY SELECTION */}
      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setSelectedPlace(null);
        }}
      >
        {Object.keys(data).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* PLACE LIST */}
      <h4>Parking Locations</h4>
      {data[city].map((place) => {
        const counts = getCounts(place.slots);

        return (
          <div
            key={place.id}
            className="place-card"
            onClick={() => setSelectedPlace(place)}
          >
            <div>
              <strong>{place.name}</strong>
              <p>{place.type}</p>
            </div>

            <div className="counts">
              <span className="available">{counts.available} Free</span>
              <span className="booked">{counts.booked} Booked</span>
            </div>
          </div>
        );
      })}

      {/* SLOT VIEW */}
      {selectedPlace && (
        <>
          <h4>{selectedPlace.name} – Slots</h4>

          <div className="slot-grid">
            {selectedPlace.slots.map((slot) => (
              <div
                key={slot.id}
                className={`slot-box ${slot.booked ? "booked" : "available"} ${
                  selectedSlot === slot.id ? "selected" : ""
                }`}
                onClick={() => !slot.booked && setSelectedSlot(slot.id)}
              >
                Slot {slot.id}
              </div>
            ))}
          </div>

          <button className="book-btn" onClick={bookSlot}>
            Book Slot
          </button>
        </>
      )}
    </div>
  );
}
