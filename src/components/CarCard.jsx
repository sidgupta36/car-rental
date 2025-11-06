
import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const API_URL = 'http://localhost:5000'; // The base URL of the backend

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img 
        src={`${API_URL}/${car.imageUrl}`}
        alt={`${car.make} ${car.model}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
        <p className="text-gray-600 mb-2">Year: {car.year}</p>
        <p className="text-lg font-semibold mb-4">${car.pricePerDay}/day</p>
        <Link 
          to={`/cars/${car._id}`}
          className="w-full bg-blue-500 text-white text-center font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 block"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
