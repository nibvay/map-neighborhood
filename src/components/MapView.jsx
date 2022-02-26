import { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from '@react-google-maps/api';
import { GOOGLE_MAP_AUTH_KEY } from '../assets/license'

// ref. https://www.oxxostudio.tw/articles/201802/google-maps-12-rect-circle.html
// ref. https://zh-tw.coderbridge.com/series/a98833b7bf4d43d38c7d541cf4cbe1b1/posts/f7b42bbec1ea4e1c94764d2bc2f9085b
// ref. https://react-google-maps-api-docs.netlify.app/
const LoadScriptLibraries = ["places"];

function MapView() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 25.0261704, lng: 121.5253597 });
  const autocompleteRef = useRef();

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setCurrentLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    };
  }

  const onLoad = (instance) => {
    autocompleteRef.current = instance;
  }

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAP_AUTH_KEY}
      libraries={LoadScriptLibraries}
    >
      <GoogleMap
        mapContainerStyle={{ height: '90vh', width: '100%' }}
        center={currentLocation}
        zoom={17}
      >
        <Autocomplete
          onLoad={onLoad}
          ref={autocompleteRef}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </Autocomplete>
        <Marker position={{ lat: 25.026549, lng: 121.527579 }} />
        <Marker position={{ lat: 25.0268483, lng: 121.5257582 }} />
        <Circle
          center={{ lat: 25.026549, lng: 121.527579 }}
          options={{
            radius: 10,
            strokeOpacity: 0,
            fillColor: '#f00',
            fillOpacity: 0.35,
          }}
        />
         <Circle
          center={{ lat: 25.0268483, lng: 121.5257582 }}
          options={{
            radius: 10,
            strokeOpacity: 0,
            fillColor: '#f00',
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;


    // <input ref={searchValueRef} type="text" onChange={handleSearchValue} />
    // <div style={{ height: '100vh', width: '100%' }}>
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ key: KEY }}
    //     defaultCenter={defaultProps.center}
    //     defaultZoom={defaultProps.zoom}
    //     onGoogleApiLoaded={({ map, maps }) => {
    //       return [
    //         new maps.Circle({
    //           center: { lat: 25.026549, lng: 121.527579 },
    //           radius: 10,
    //           strokeOpacity: 0,
    //           fillColor: '#f00',
    //           fillOpacity: 0.35,
    //           map: map
    //         }),
    //         new maps.Circle({
    //           center: { lat: 25.0268483, lng: 121.5257582 },
    //           radius: 10,
    //           strokeOpacity: 0,
    //           fillColor: '#f00',
    //           fillOpacity: 0.35,
    //           map: map
    //         })
    //       ]
    //     }}
    //   >
    //     <AnyReactComponent
    //       lat={25.026549}
    //       lng={121.527579}
    //       text="test A"
    //     />
    //     <AnyReactComponent
    //       lat={25.0268483}
    //       lng={121.5257582}
    //       text="test B"
    //     />
    //   </GoogleMapReact>
    // </div>
