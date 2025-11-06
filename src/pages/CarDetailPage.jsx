
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, bookCar } from '../api';

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

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={`http://localhost:5000/${car.imageUrl}`} alt={`${car.make} ${car.model}`} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{car.make} {car.model}</h1>
          <p className="text-lg text-gray-600 mb-2">Year: {car.year}</p>
          <p className="text-2xl font-semibold mb-4">${car.pricePerDay}/day</p>
          
          <form onSubmit={handleBooking} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-xl font-bold mb-4">Book this Car</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDate">
                Booking Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnDate">
                Return Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
