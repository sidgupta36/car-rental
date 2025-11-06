import React from 'react';
import { motion } from 'framer-motion';

const AuthForm = ({ title, fields, handleSubmit, error, submitText }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[80vh]"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">{title}</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="text-sm font-bold text-gray-600">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required
                className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
          ))}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:shadow-outline shadow-lg"
            >
              {submitText}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AuthForm;
