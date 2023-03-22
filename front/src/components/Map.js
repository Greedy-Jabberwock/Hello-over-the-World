import './Map.style.css';

import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import LocationOn from "@mui/icons-material/LocationOn";

//customdata to test -> TO DELETE
// import data from '../json/custom.json'

const Map = () => {

    const [viewport, setViewport] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    const [points, setPoints] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await axios.get('http://localhost:3003/api/places');
            console.log(places.data);
            setPoints(places.data);
        };
        fetchPlaces();
    }, [])

    return (
        <section id='MapContainer'>
            <ReactMapGL
                {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={e => {
                    setViewport(e.viewport);
                }}
                attributionControl={true}
            >

                {points.map(point => {
                    return (
                        <Marker
                            key={point.id}
                            latitude={point.latitude}
                            longitude={point.longitude}
                        >

                            <LocationOn
                                onClick={() => {
                                    setShowPopup(true);
                                }} />
                            {/* <span>{point.name}</span> */}
                            {showPopup && (
                                <Popup
                                    longitude={point.longitude}
                                    latitude={point.latitude}
                                    anchor='bottom'
                                    onClose={() => setShowPopup(false)}>
                                    You are here
                                </Popup>
                            )}
                        </Marker>
                    )
                })}
            </ReactMapGL>
        </section>
    )
};

export default Map;