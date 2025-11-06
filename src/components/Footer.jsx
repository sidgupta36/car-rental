
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="bg-gray-800 text-white p-8"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Car Rental</h3>
          <p className="text-gray-400">
            Your trusted partner for car rentals. We offer a wide range of vehicles to suit your needs.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">123 Main Street, Anytown, USA</p>
          <p className="text-gray-400">Email: info@carrental.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Car Rental. All Rights Reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;