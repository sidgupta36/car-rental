
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md"
    >
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 flex items-center">
          <FaCar className="mr-2" />
          Car Rental
        </Link>
        <ul className="hidden md:flex items-center space-x-8">
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-semibold">Home</Link>
          </motion.li>
          {user && (
            <>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/my-bookings" className="text-gray-600 hover:text-indigo-600 font-semibold">My Bookings</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/add-car" className="text-gray-600 hover:text-indigo-600 font-semibold">Add Car</Link>
              </motion.li>
            </>
          )}
        </ul>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700">Welcome, {user.username}!</span>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-semibold py-2 px-4">Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;