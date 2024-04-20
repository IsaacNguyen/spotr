// ParentComponent.jsx
import React, { useState } from 'react';
import CityInput from './components/CityInput.jsx';
import { getPlaces } from './api.js'; // Import the function to fetch places from Firestore

const ParentComponent = () => {
  const [currentCity, setCurrentCity] = useState('');
  const [placesInCity, setPlacesInCity] = useState([]);

  // Function to handle changes to the city input
  const handleCityChange = async (city) => {
    setCurrentCity(city); // Update the current city in the parent component state

    try {
      // Fetch places data for the selected city
      const placesData = await getPlacesInCity(city); // Assuming getPlacesInCity is defined to fetch places from Firestore
      setPlacesInCity(placesData); // Update the placesInCity state with the fetched data
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <div>
      <h1>Enter Your City</h1>
      <CityInput onCityChange={handleCityChange} />
      
      {currentCity && (
        <div>
          <h2>Places in {currentCity}</h2>
          <ul>
            {placesInCity.map(place => (
              <li key={place.id}>
                <h3>Name: {place.name}</h3>
                <p>Description: {place.description}</p>
                {place.image && <img src={place.image} alt={place.name} style={{ maxWidth: '0%' }} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
