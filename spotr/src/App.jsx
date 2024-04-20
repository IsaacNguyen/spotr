import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main_Map from './components/Main_Map.jsx'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';
import Photo_Input from './components/Photo_Input';

function App() {
  const position = {lat: 61.2176, lng: -149.8997};
  const [showImageInput, setImageInput] = useState(false);

  const toggleImageInput = () => {
    setImageInput(prevState => !prevState)
  }

  return (
    <div>
        <div className = "taskbar">
          <div >TASKBAR</div>
          <button className = "image-input" onClick = {toggleImageInput}> Input Image </button>
        </div>
        {showImageInput && <Photo_Input></Photo_Input>}
        <Main_Map></Main_Map>
    </div>
  )
}

export default App
