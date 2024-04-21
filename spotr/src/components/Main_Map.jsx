import { getPlaces } from '../api'
import { useState, useEffect } from 'react';
import DisplayInfo from './DisplayInfo';
import './Main_Map.css'
import './DisplayInfo.css'
import './styles.css'
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    APIProvider,
    Marker
} from '@vis.gl/react-google-maps';

function Main_Map(props){
    //console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    //const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
    //const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const googleMapsApiKey = "AIzaSyDEN52mPD7FK7Rt5OsGuWloQ16Q6N8iSJQ"

    // alter this position by passing location based on user input
    //const [markers, setMarkers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const placesData = await getPlaces(); // Fetch places data from API
                setPlaces(placesData); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        }

        fetchData(); // Call fetchData when component mounts
    }, []);

    const markerClick = (place) => {
      setSelectedPlace(place);
    }

    const handleCloseDisplayInfo = () => {
        setSelectedPlace(null); // Close the display info by resetting selectedPlace to null
    };

    return (
        <div style={{justifyContent: (selectedPlace==null) ? 'center' : ''}} className = "map-container">
            <APIProvider apiKey={googleMapsApiKey}>
            <div className='map-wrapper'>
                        <Map
                            mapId={'current'}
                            defaultZoom={13}
                            defaultCenter={props.position}
                        >
                            {places.map((place, index) => (
                                <AdvancedMarker
                                    position={{
                                        lat: parseFloat(place.lat),
                                        lng: parseFloat(place.lng),
                                    }}
                                    key={index}
                                    mapId={'current'}
                                    onClick={() => markerClick(place)}
                                />
                            ))}
                        </Map>
                    </div>
                {selectedPlace && (
                    <div className="place-details-container">
                            <button className='close-button'>X</button>
                        <DisplayInfo close={handleCloseDisplayInfo}place={selectedPlace} />
                    </div>
                )}
            </APIProvider>
       </div>
    )
}
export default Main_Map;