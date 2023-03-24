import './Map.style.css';

import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import axios from 'axios';
import { LocationOn } from "@mui/icons-material";
import { Offcanvas } from 'react-bootstrap';

const GLMap = () => {

    // HOOKS
    const [viewport, setViewport] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await axios.get('http://localhost:3003/api/places');
            setPoints(places.data);
        };
        fetchPlaces();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                <LocationOn onClick={() => {
                                    handleMarkerClick(point);
                                    handleShow();
                                    }} />
                            </Marker>
                        </div>
                    )
                })}
            </Map>
            {selectedPoint &&
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{selectedPoint.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {selectedPoint.articles.length > 0 
                            ? 
                            selectedPoint.articles.map(article => {
                                return <div>{article.title}</div>
                            })
                            :
                            <div>There are no articles yet. Be first!</div>
                        }
                    </Offcanvas.Body>
                </Offcanvas>}
        </section>
    )

};

export default GLMap;

