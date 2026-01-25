// src/services/bookingService.js

export const startParking = (bookingId) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const booking = bookings.find(b => b.id === bookingId);

  if (booking && !booking.startTime) {
    booking.startTime = new Date().toISOString();
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }
};

export const stopParking = (bookingId) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const booking = bookings.find(b => b.id === bookingId);

  if (booking && booking.startTime) {
    booking.endTime = new Date().toISOString();

    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const minutes = Math.ceil((end - start) / 60000);

    booking.duration = minutes;
    booking.amount = calculateAmount(minutes);
    booking.paymentStatus = "PENDING";

    localStorage.setItem("bookings", JSON.stringify(bookings));
  }
};

export const calculateAmount = (minutes) => {
  const ratePerHour = 50; // ₹50 per hour
  return Math.ceil((minutes / 60) * ratePerHour);
};

export const simulatePayment = (bookingId) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const booking = bookings.find(b => b.id === bookingId);

  if (booking) {
    booking.paymentStatus = "PAID";
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }
};
