
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, bookCar } from '../api';
import { motion } from 'framer-motion';

const CarDetailPage = () => {
  const [car, setCar] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState(null);
  const { carId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await getCarById(carId);
        setCar(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch car details.');
      }
    };
    fetchCar();
  }, [carId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      navigate('/login');
      return;
    }

    const bookingData = {
      car: carId,
      user: user._id,
      bookingDate,
      returnDate,
      totalPrice: car.pricePerDay * ( (new Date(returnDate) - new Date(bookingDate)) / (1000 * 60 * 60 * 24) )
    }

    try {
      await bookCar(bookingData);
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book car.');
    }
  };

  if (!car) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div></div>;

  return (
    <div className="container mx-auto p-4">
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <img src={`http://localhost:5000/${car.imageUrl}`} alt={`${car.make} ${car.model}`} className="w-full rounded-lg shadow-2xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">{car.make} {car.model}</h1>
          <p className="text-xl text-gray-600 mb-6">Year: {car.year}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-8">${car.pricePerDay}/day</p>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
            <ul className="grid grid-cols-2 gap-4 text-gray-700">
              <li><span className="font-semibold">Make:</span> {car.make}</li>
              <li><span className="font-semibold">Model:</span> {car.model}</li>
              <li><span className="font-semibold">Year:</span> {car.year}</li>
              <li><span className="font-semibold">Price:</span> ${car.pricePerDay}/day</li>
            </ul>
          </div>

          <form onSubmit={handleBooking} className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Book this Car</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="bookingDate">
                Booking Date
              </label>
              <input
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="returnDate">
                Return Date
              </label>
              <input
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg"
              type="submit"
            >
              Confirm Booking
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetailPage;
