// CityInput.jsx
import React, { useState } from 'react';

const CityInput = ({ onCityChange }) => {
  const [city, setCity] = useState(''); // State to store the city input

  // Function to handle changes in the input field
  const handleChange = (event) => {
    setCity(event.target.value); // Update the city state with the input value
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onCityChange(city); // Pass the city value to the parent component
    setCity(''); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your city:
        <input type="text" value={city} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CityInput;
