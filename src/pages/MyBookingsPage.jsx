
import React, { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../api';
import { motion } from 'framer-motion';

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
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-4xl font-bold mb-8 text-gray-800"
      >
        My Bookings
      </motion.h1>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      
      {bookings.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-lg text-gray-600">You have no bookings yet. Time to rent a car!</p>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {bookings.map(booking => (
            <motion.div 
              key={booking._id} 
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center"
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img src={`http://localhost:5000/${booking.car.imageUrl}`} alt={booking.car.make} className="w-32 h-20 object-cover rounded-lg mr-6"/>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{booking.car.make} {booking.car.model}</h2>
                  <p className="text-gray-600">From: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="text-gray-600">To: {new Date(booking.returnDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xl font-semibold text-gray-800 mb-2">Total: ${booking.totalPrice}</p>
                <p className="mb-4">Status: <span className={`font-bold ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}`}>{booking.status}</span></p>
                {booking.status === 'Confirmed' && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
                  >
                    Cancel Booking
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyBookingsPage;
