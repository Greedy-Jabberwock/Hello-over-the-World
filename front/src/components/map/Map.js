import './Map.style.css';

import {
    useState,
    useEffect,
    useRef
} from 'react';
import Map from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

import {
    Marker,
    GeolocateControl,
    NavigationControl
} from 'react-map-gl';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { LocationOn } from "@mui/icons-material";
import { Offcanvas } from 'react-bootstrap';
import PAGES from '../../pages.const.js';
import giveHint from '../../utils/giveHint.js';
import BASE_URL from '../../utils/getBaseUrl';


const GLMap = (props) => {

    // HOOKS
    const [viewport, setViewport] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [showSelected, setShowSelected] = useState(false);
    const [showCreating, setShowCreating] = useState(false);
    const [newMarkerCoord, setNewMarkerCoord] = useState(null);

    const geolocateControlRef = useRef([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await axios.get(`${BASE_URL}/api/places`);
            setPoints(places.data);
        };
        fetchPlaces();
        props.needHint && giveHint();
    }, [])

    const handleSelectedClose = () => setShowSelected(false);
    const handleCreatingClose = () => setShowCreating(false);
    const handleShow = () => setShowSelected(true);

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.elements.name.value,
            latitude: newMarkerCoord.lat,
            longitude: newMarkerCoord.lng
        };
        props.setNewMarkerInfo(data);
        props.setPage(PAGES.new_article);
    }

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
                onContextMenu={(e) => {
                    setNewMarkerCoord(e.lngLat);
                    setShowCreating(true);
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
                                scale={3}
                            >
                                <LocationOn 
                                    onClick={() => {
                                    handleMarkerClick(point);
                                    handleShow();
                                }} />
                            </Marker>
                        </div>
                    )
                })}
                <GeolocateControl ref={geolocateControlRef} />
                <NavigationControl />
            </Map>
            {selectedPoint &&
                <Offcanvas show={showSelected} onHide={handleSelectedClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{selectedPoint.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {selectedPoint.articles.length > 0
                            ?
                            <ListGroup>
                                {selectedPoint.articles.map(article => {
                                    return (
                                        <ListGroup.Item
                                            action variant='info'
                                            onClick={() => {
                                                props.setCurrentArticle(article);
                                                props.setPage(PAGES.article);
                                            }}>
                                            {article.title}
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                            :
                            <div>There are no articles yet. Be first!</div>
                        }
                    </Offcanvas.Body>
                </Offcanvas>}

            {showCreating &&
                <Offcanvas show={showCreating} placement='end' onHide={handleCreatingClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>New place menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div>Coordinates: </div>
                        <ul>
                            <li><b>Latitude: </b>{newMarkerCoord.lat}</li>
                            <li><b>Longitude: </b>{newMarkerCoord.lng}</li>
                        </ul>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Place name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='name'
                                    placeholder="Enter name of this place..."
                                    minLength={5}
                                    maxLength={50}
                                />
                                <Form.Text className="text-muted my-2">
                                    Marker can't be empty, so you will need to create an article or quizz about this place.
                                </Form.Text>
                                <br />
                                {props.currentUser ?
                                    <Button variant="primary" type="submit">
                                        Add article
                                    </Button>
                                    :
                                    <Button variant="danger" disabled type="submit">
                                        You need authorize to continue
                                    </Button>
                                }
                            </Form.Group>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>}
        </section>
    )

};

export default GLMap;

