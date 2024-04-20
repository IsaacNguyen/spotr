import { useState } from 'react'
import './App.css'
import Main_Map from './components/Main_Map.jsx'
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

      <div className = "interface">
          {showImageInput && <Photo_Input></Photo_Input>}

          <Main_Map></Main_Map>
      </div>
    </div>
  )
}

export default App
