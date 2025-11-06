
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../api';

const AddCarPage = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
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
    formData.append('carImage', carImage);

    try {
      await addCar(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center" style={{minHeight: '80vh'}}>
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Add a New Car</h2>
          
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">
                Make
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="make"
                type="text"
                placeholder="e.g., Toyota"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                Model
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="model"
                type="text"
                placeholder="e.g., Camry"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                Year
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="year"
                type="number"
                placeholder="e.g., 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">
                Price Per Day
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pricePerDay"
                type="number"
                placeholder="e.g., 50"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carImage">
              Car Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="carImage"
              type="file"
              onChange={(e) => setCarImage(e.target.files[0])}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;
