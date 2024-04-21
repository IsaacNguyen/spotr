import { useLoadScript } from '@react-google-maps/api';
import { useState } from 'react'
import './App.css'
import Main_Map from './Main_Map.jsx'
import Photo_Input from './Photo_Input.jsx';
import { useNavigate } from 'react-router-dom';

import {
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';


function App({ username }) {
  const position = {lat: 33.7445, lng: -118.3870};
  const [spots, setSpots] = useState([]);
  const [showImageInput, setImageInput] = useState(false);
  const navigate = useNavigate();
  /*
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries: ["places"]
  })
  */

  const toggleImageInput = () => {
    setImageInput(prevState => !prevState)
  }

  const onMapClick = (e) => {

    setSpots((current) => 
    [
      ...current,
      {
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng
      }
    ]);
  };
  const returnToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };
  return (
    <div>
      <div className="taskbar">
        <button onClick={returnToLogin}>Return to Login</button> {/* Button to return to the login page */}
        <div>SPOTR</div>
        <button className="image-input" onClick={toggleImageInput}>Input A Spot</button>
      </div>

      <div className = "interface">
          {showImageInput && 
            <Photo_Input username = {username} close={toggleImageInput} submit={setSpots} spots={spots}></Photo_Input>}

          <Main_Map position={position} mapClick={onMapClick} markers={spots}></Main_Map>
      </div>
    </div>
  )
}

export default App