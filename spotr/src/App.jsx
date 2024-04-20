import { useLoadScript } from '@react-google-maps/api';
import { useState } from 'react'
import Draggable, {DraggableCore} from "react-draggable";
import './App.css'
import Main_Map from './components/Main_Map.jsx'
import Photo_Input from './components/Photo_Input';

import {
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';


function App() {
  const position = {lat: 33.7445, lng: -118.3870};
  const [spots, setSpots] = useState([]);
  const [showImageInput, setImageInput] = useState(false);
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

  return (
    <div>
      <div className = "taskbar">
            <div >TASKBAR</div>
            <button className = "image-input" onClick = {toggleImageInput}> Input Image </button>
          </div>

      <div className = "interface">
          {showImageInput && 
            <Photo_Input close={toggleImageInput} submit={setSpots} spots={spots}></Photo_Input>}

          <Main_Map position={position} mapClick={onMapClick} markers={spots}></Main_Map>
      </div>
    </div>
  )
}

export default App
