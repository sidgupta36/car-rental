
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCars } from '../api';
import CarCard from '../components/CarCard';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getAllCars();
        setAllCars(res.data);
        setCars(res.data.slice(0, 6)); // Initially show first 6 cars
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      }
    };
    fetchCars();
  }, []);

  const featuredCars = allCars.filter(car => car.featured);

  const filteredCars = allCars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCars = searchTerm ? filteredCars : cars;

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative rounded-lg overflow-hidden mb-12"
      >
        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car Banner" className="w-full h-96 object-cover"/>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
          <motion.h1 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl font-bold mb-4">Find Your Dream Car</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="text-xl mb-8">Rent the perfect car for your next adventure.</motion.p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">Explore Cars</motion.button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-12">
        <input 
          type="text"
          placeholder="Search for a car (e.g., Toyota, Honda)"
          className="w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured Cars Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Cars</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* All Cars Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Cars</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {displayedCars.map((car) => (
            <motion.div
              key={car._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
