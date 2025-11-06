
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  const fields = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Choose a username',
      value: username,
      onChange: (e) => setUsername(e.target.value)
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  return (
    <AuthForm 
      title="Register"
      fields={fields}
      handleSubmit={handleSubmit}
      error={error}
      submitText="Register"
    />
  );
};

export default RegisterPage;
