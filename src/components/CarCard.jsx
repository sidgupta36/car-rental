
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CarCard = ({ car }) => {
  const API_URL = 'http://localhost:5000'; // The base URL of the backend

  return (
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img 
        src={`${API_URL}/${car.imageUrl}`}
        alt={`${car.make} ${car.model}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.make} {car.model}</h3>
        <p className="text-gray-600 mb-4">Year: {car.year}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-indigo-600">${car.pricePerDay}/day</p>
          <Link 
            to={`/cars/${car._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
