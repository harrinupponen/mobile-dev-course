import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('MyApiKey');

export default function Map(props) {

  useEffect(() => {
    findLocation();
  }, [])

  const {params} = props.navigation.state;

  const [lat, setLat] = useState(60.201373);
  const [lng, setLng] = useState(24.934041);

  const findLocation = () => {
    Geocoder.from(params.place)
            .then(json => {
              let location = json.results[0].geometry.location;
              setLat(location.lat);
              setLng(location.lng);
            })
            .catch(error => console.warn(error));
        }
            
  return (
      <MapView
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }}>
        <Marker 
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
          title={params.place}
        />
      </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});