
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 flex items-center">
          <FaCar className="mr-2" />
          Car Rental
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
              </li>
              <li>
                <Link to="/add-car" className="hover:text-gray-300">Add Car</Link>
              </li>
            </>
          )}
        </ul>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Welcome, {user.username}!</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;