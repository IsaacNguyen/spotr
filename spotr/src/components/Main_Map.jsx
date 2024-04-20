

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
//import GOOGLE_MAPS_API from '../../.env';
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
    const [markers, setMarkers] = useState([]);

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

    const position = {lat: 61.2176, lng: -149.8997};

    const googleMapsApiKey = GOOGLE_MAPS_API;
    return (
        <div>
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