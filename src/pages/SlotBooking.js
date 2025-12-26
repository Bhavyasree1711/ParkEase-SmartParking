import "./SlotBooking.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SlotBooking() {
  const navigate = useNavigate();

  /* 🔐 AUTH CHECK */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const STORAGE_VERSION = "v4";

  function createSlots(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      booked: false,
    }));
  }

  /* 🏙️ DATA */
  const defaultData = {
    Bangalore: [
      { id: 1, name: "Orion Mall", type: "Shopping Mall", slots: createSlots(10) },
      { id: 2, name: "Forum Mall", type: "Shopping Mall", slots: createSlots(8) },
      { id: 3, name: "Apollo Hospital", type: "Hospital", slots: createSlots(7) },
      { id: 4, name: "Manyata Tech Park", type: "IT Park", slots: createSlots(12) },
      { id: 5, name: "Kempegowda Airport", type: "Airport", slots: createSlots(20) },
    ],
    Chennai: [
      { id: 1, name: "Phoenix Mall", type: "Shopping Mall", slots: createSlots(9) },
      { id: 2, name: "MIOT Hospital", type: "Hospital", slots: createSlots(6) },
    ],
  };

  /* 🔄 LOAD STORAGE WITH VERSIONING */
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("realtimeParking");
    const savedVersion = localStorage.getItem("parkingVersion");

    if (savedData && savedVersion === STORAGE_VERSION) {
      return JSON.parse(savedData);
    }

    localStorage.setItem("realtimeParking", JSON.stringify(defaultData));
    localStorage.setItem("parkingVersion", STORAGE_VERSION);
    return defaultData;
  });

  const [city, setCity] = useState("Bangalore");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* 💾 SAVE */
  useEffect(() => {
    localStorage.setItem("realtimeParking", JSON.stringify(data));
  }, [data]);

  /* 📊 COUNTS */
  const getCounts = (slots) => {
    const booked = slots.filter((s) => s.booked).length;
    return {
      booked,
      available: slots.length - booked,
    };
  };

  /* 🚗 BOOK SLOT */
  const bookSlot = () => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    setData((prev) => {
      const updatedPlaces = prev[city].map((place) =>
        place.id === selectedPlace.id
          ? {
              ...place,
              slots: place.slots.map((s) =>
                s.id === selectedSlot ? { ...s, booked: true } : s
              ),
            }
          : place
      );

      setSelectedPlace(
        updatedPlaces.find((p) => p.id === selectedPlace.id)
      );

      return { ...prev, [city]: updatedPlaces };
    });

    alert("Slot booked successfully");
    setSelectedSlot(null);
  };

  return (
    <div className="slot-page">
      <div className="slot-header">
        <span className="back-arrow" onClick={() => navigate("/")}>←</span>
        <h3>Smart Parking</h3>
      </div>

      {/* 🟢 STEP 1: PLACE SELECTION */}
      {!selectedPlace && (
        <>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {Object.keys(data).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <h4>Select Parking Location</h4>

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
        </>
      )}

      {/* 🟢 STEP 2: SLOT BOOKING */}
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

          <button
            className="back-btn"
            onClick={() => {
              setSelectedPlace(null);
              setSelectedSlot(null);
            }}
          >
            ← Back to Locations
          </button>
        </>
      )}
    </div>
  );
}
