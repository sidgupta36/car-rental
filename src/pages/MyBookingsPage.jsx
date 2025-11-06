
import React, { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../api';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings(user._id);
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings.');
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{booking.car.make} {booking.car.model}</h2>
                <p>From: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>To: {new Date(booking.returnDate).toLocaleDateString()}</p>
                <p>Total: ${booking.totalPrice}</p>
                <p>Status: <span className={`font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}`}>{booking.status}</span></p>
              </div>
              {booking.status === 'Confirmed' && (
                <button 
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
