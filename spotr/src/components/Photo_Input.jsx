import './styles.css';
import {useState} from 'react';
import { addPlace } from '../api';
import exifr from 'exifr'

function Photo_Input(props){

        const [image, setImage] = useState(null);
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');

        const handleNameChange = (e) => {
            setName(e.target.value);
        };
    
        const handleDescriptionChange = (e) => {
            setDescription(e.target.value);
        };

        const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImage(file);
        }

        const handleSubmit = async () => {
            if (image){
                const gpsData = await exifr.gps(image);
                if(gpsData){
                    await addPlace(
                            {
                                description: description,
                                image: URL.createObjectURL(image),
                                lat: gpsData.latitude,
                                lng: gpsData.longitude,
                                name: name,
                                user: 'thebeast'
                            }
                        );
                    props.close();
                } 
                else {
                    console.log("NO LOCATION DATA")
                }  
            }
        }
    return (
        <div className = 'main-input'>
            <div style={{padding:"10px", fontWeight:'bold'}}> Input Your Spot</div>
            <button className = 'close-button' onClick = {props.close}>X</button>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {image && (<div style={{flexDirection:'column', display:'flex', alignItems:'center' }}>
                        <img style={{margin:'5px'}} className = "uploaded-image" src={URL.createObjectURL(image)} alt="Uploaded" />
                        <input onChange={handleNameChange}label="Name" placeholder='Name your Spot' style={{marginBottom:'5px'}}></input>
                        <textarea onChange={handleDescriptionChange} cols='20' rows='10'className = 'description' value={description} label="Description" placeholder='Give your Spot a short description'></textarea>
                        <button onClick={handleSubmit}> Submit </button>
                    </div>
                    )}
        </div>
    )
}

export default Photo_Input;