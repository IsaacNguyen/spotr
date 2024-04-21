import './styles.css';
import {useState} from 'react';
import { addPlace } from '../api';
import exifr from 'exifr'

// ... your Firebase configuration (replace with your actual values)
const firebaseConfig = {
    apiKey: "AIzaSyAjMSsqHg7kNlcLbDAhwOjQqN11q0o3AeQ",
    authDomain: "spotr-258a2.firebaseapp.com",
    databaseURL: "https://spotr-258a2-default-rtdb.firebaseio.com",
    projectId: "spotr-258a2",
    storageBucket: "spotr-258a2.appspot.com",
    messagingSenderId: "940149876291",
    appId: "1:940149876291:web:43b8fdf03acb27464296f6",
    measurementId: "G-MTW78WL73N"
};

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

