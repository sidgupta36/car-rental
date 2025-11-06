
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../api';
import { motion } from 'framer-motion';

const AddCarPage = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [featured, setFeatured] = useState(false);
  const [carImage, setCarImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('pricePerDay', pricePerDay);
    formData.append('featured', featured);
    formData.append('carImage', carImage);

    try {
      await addCar(formData);
      navigate('/', { state: { carAdded: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[80vh]"
    >
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Add a New Car</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-600" htmlFor="make">
                Make
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="make"
                type="text"
                placeholder="e.g., Toyota"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600" htmlFor="model">
                Model
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="model"
                type="text"
                placeholder="e.g., Camry"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600" htmlFor="year">
                Year
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="year"
                type="number"
                placeholder="e.g., 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600" htmlFor="pricePerDay">
                Price Per Day
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="pricePerDay"
                type="number"
                placeholder="e.g., 50"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="featured"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Featured
            </label>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600" htmlFor="carImage">
              Car Image
            </label>
            <input
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="carImage"
              type="file"
              onChange={(e) => setCarImage(e.target.files[0])}
              required
            />
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg"
              type="submit"
            >
              Add Car
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddCarPage;
