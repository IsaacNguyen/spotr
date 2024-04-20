
import React, { useState } from 'react';
import { getPlacesInCity } from './api.js'; // Import the Axios function to retrieve data

const Button = () => {
  const [places, setPlaces] = useState([]); // State to store the retrieved places

  // Function to fetch places data from the backend
  const fetchPlaces = async () => {
    try {
      // Call the getPlacesInCity function from the axiosClient
      const data = await getPlacesInCity('la'); // Assume 'la' is the city parameter
      setPlaces(data); // Update the state with the retrieved places
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button onClick={fetchPlaces}>Fetch Places In LA</button>
      {/* Render the retrieved places */}
      <ul>
        {places.map(place => (
        <div key={place.id}>
        <h2>{place.name}</h2>
        <img src={place.image} alt={place.name} style={{ maxWidth: '100%' }} />
        <p>{place.description}</p>
      </div>
        ))}
      </ul>
    </div>
  );
};

export default Button;
