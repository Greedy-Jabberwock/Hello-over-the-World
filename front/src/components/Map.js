import './Map.style.css';

import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import { LocationOn } from "@mui/icons-material";

//customdata to test -> TO DELETE
// import data from '../json/custom.json'

const GLMap = () => {

    // HOOKS
    const [viewport, setViewport] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await axios.get('http://localhost:3003/api/places');
            setPoints(places.data);
        };
        fetchPlaces();
    }, [])

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
    };

    // RENDERING

    return (
        <section id='MapContainer'>
            <Map
                {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={e => {
                    setViewport(e.viewport);
                }}
                attributionControl={true}
                projection='globe'
            >

                {points.map(point => {
                    return (
                        <div key={point.id}>
                            <Marker
                                latitude={point.latitude}
                                longitude={point.longitude}

                            >
                                <LocationOn onClick={() => handleMarkerClick(point)} />
                            </Marker>
                            {selectedPoint === point && (<Popup
                                longitude={point.longitude}
                                latitude={point.latitude}
                                anchor='left'
                                closeOnClick={false}
                                onClose={() => setShowPopup(false)}
                            >
                                <div>{point.name}</div>
                            </Popup>)}
                        </div>
                    )
                })}
            </Map>
        </section>
    )

};

export default GLMap;

