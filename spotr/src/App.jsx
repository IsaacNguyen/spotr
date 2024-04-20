import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main_Map from './components/Main_Map.jsx'
import config from '../config.json'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';

function App() {
  const position = {lat: 61.2176, lng: -149.8997};
  const googleMapsApiKey = config.api_keys.GOOGLE_MAPS_API;

  return (
    <div>
        <div>Map</div>
        <Main_Map></Main_Map>
    </div>
  )
}

export default App
