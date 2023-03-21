import ReactMapGL from 'react-map-gl';

const Map = () => {
    console.log(ReactMapGL);
    return (
        <>
            <ReactMapGL
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5
                }}
                style={{ width: '100vw', height: '98vh' }}
                mapStyle="mapbox://styles/cross-maten/clfhhk56d00qk01peb9gm830h"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
        </>
    )
};

export default Map;