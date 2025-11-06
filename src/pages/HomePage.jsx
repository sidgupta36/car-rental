
import React, { useState, useEffect } from 'react';
import { getAllCars } from '../api';
import CarCard from '../components/CarCard';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getAllCars();
        setCars(res.data);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Car Rental</h1>
        <p className="text-lg text-gray-600">Find the perfect car for your next adventure.</p>
      </div>

      <div className="mb-8">
        <input 
          type="text"
          placeholder="Search for a car..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
