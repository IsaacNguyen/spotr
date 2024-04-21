import './styles.css';
import {useState} from 'react';
import { addPlace } from '../api';
import exifr from 'exifr'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage, `image_${Date.now()}`);


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
                    // Upload the bytes and wait for the upload to complete
                    await uploadBytes(storageRef, image);

                    console.log('Uploaded a blob or file!');

                    // Get the download URL after the upload is complete
                    const downloadURL = await getDownloadURL(storageRef);

                    console.log('Download URL:', downloadURL);
                    await addPlace(
                            {
                                description: description,
                                image: downloadURL,
                                lat: gpsData.latitude,
                                lng: gpsData.longitude,
                                name: name,
                                user: props.username
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
            <div style={{padding:"10px"}}> Input Your Spot</div>
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