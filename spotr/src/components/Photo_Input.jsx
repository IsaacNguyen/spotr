import './styles.css';
import {useState} from 'react';
import exifr from 'exifr'

function Photo_Input(props){

        const [image, setImage] = useState(null);
      
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImage(file);
        }

        const handleSubmit = async () => {
            if (image){
                const gpsData = await exifr.gps(image);
                console.log(gpsData);
                if(gpsData){
                    props.submit((current) =>
                        [
                            ...current,
                            {
                                lat: gpsData.latitude,
                                lng: gpsData.longitude
                            }
                        ]);
                    console.log(props.spots)
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
                {image && (<div>
                    <img className = "uploaded-image" src={URL.createObjectURL(image)} alt="Uploaded" />
                    <button onClick={handleSubmit}> Submit </button>
                    </div>
                    )}
        </div>
    )
}

export default Photo_Input;