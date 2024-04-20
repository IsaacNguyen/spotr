
import { useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    APIProvider,
    Marker
} from '@vis.gl/react-google-maps';

function Main_Map(props){
    // alter this position by passing location based on user input
    const position = {lat: 61.2176, lng: -149.8997};
    const [markers, setMarkers] = useState([]);


    // FIX THIS!!!
    //const googleMapsApiKey = process.env.GOOGLE_MAPS_API;
    const googleMapsApiKey = "AIzaSyDEN52mPD7FK7Rt5OsGuWloQ16Q6N8iSJQ"
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

   

   
    return (
        <div className = "map">
        <APIProvider apiKey={googleMapsApiKey}>
             <div style={{height: "100vh", width: "100vh"}}>
                <Map onClick = {onMapClick} defaultZoom={9} defaultCenter={position}>
                    {markers.map((marker) => (
                        <Marker 
                        position={{ 
                            lat: marker.lat,
                            lng: marker.lng 
                        }} />
                    ))};
                </Map>
             </div>
        </APIProvider>
       </div>
    )
}
export default Main_Map;