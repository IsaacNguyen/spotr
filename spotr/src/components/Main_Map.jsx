

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import config from '../../config.json'
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    APIProvider
} from '@vis.gl/react-google-maps';

function Main_Map(props){
    const position = {lat: 61.2176, lng: -149.8997};
    const googleMapsApiKey = config.api_keys.GOOGLE_MAPS_API;
    return (
        <div>
        <APIProvider apiKey={googleMapsApiKey}>
             <div style={{height: "100vh", width: "100vh"}}>
                <Map zoom={9} center={position}></Map>
             </div>
        </APIProvider>
       </div>
    )
}
export default Main_Map;