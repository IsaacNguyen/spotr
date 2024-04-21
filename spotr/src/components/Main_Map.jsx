import { getPlaces } from '../api'
import { useState, useEffect } from 'react';
import './Main_Map.css'
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    APIProvider,
    Marker
} from '@vis.gl/react-google-maps';

function Main_Map(props){
    const [places, setPlaces] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
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

    // FIX THIS!!!
    //const googleMapsApiKey = process.env.GOOGLE_MAPS_API;
    const googleMapsApiKey = "AIzaSyDEN52mPD7FK7Rt5OsGuWloQ16Q6N8iSJQ"
    const markerClick = (marker) => {
      console.log(marker.lat);
      if (selectedMarker != marker) {
        setSelectedMarker(marker);
      }
    
    }
    //const googleMapsApiKey = props.key;
    /*
    const onMapClick = (e) => {

        setMarkers((current) => 
        [
          ...current,
          {
            lat: e.detail.latLng.lat,
            lng: e.detail.latLng.lng
          }
        ]);
      };
      */

    return (
        <div className = "map-container">
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
                        {selectedMarker && (
                            <InfoWindow
                                position={{
                                    lat: parseFloat(selectedMarker.lat),
                                    lng: parseFloat(selectedMarker.lng),
                                }}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div style={{color:'black'}}>
                                    {/* Render the image associated with the selected marker */}
                                    <img className="info-image" src={selectedMarker.image} alt="Marker Image" />
                                    <div>{selectedMarker.name}</div>
                                    <div>{selectedMarker.description}</div>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                </div>
        </APIProvider>
       </div>
    )
}
export default Main_Map;