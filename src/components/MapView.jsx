import { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from '@react-google-maps/api';
import { GOOGLE_MAP_AUTH_KEY } from '../assets/license'

// ref. https://www.oxxostudio.tw/articles/201802/google-maps-12-rect-circle.html
// ref. https://zh-tw.coderbridge.com/series/a98833b7bf4d43d38c7d541cf4cbe1b1/posts/f7b42bbec1ea4e1c94764d2bc2f9085b
// ref. https://react-google-maps-api-docs.netlify.app/
const LoadScriptLibraries = ["places"];

function MapView({ locationData, radius = 500 }) {
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
            placeholder="Search some position"
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
        <Marker position={currentLocation} />
        {
          locationData?.length > 0 && locationData.map(({ name, lat, lng }) => {
            return (
              <section key={name}>
                <Marker
                  position={{ lat, lng }}
                  label={name}
                />
                <Circle
                  center={{ lat, lng }}
                  options={{
                    radius,
                    strokeOpacity: 0,
                    fillColor: '#f00',
                    fillOpacity: 0.25,
                  }}
                />
              </section>
            )
          })

        }
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;