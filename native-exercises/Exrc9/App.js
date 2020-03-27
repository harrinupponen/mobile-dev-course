import React, { useState } from 'react';
import { StyleSheet, Button, View, KeyboardAvoidingView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('MyGoogleApiKey');

export default function App() {

  const [lat, setLat] = useState(60.201373);
  const [lng, setLng] = useState(24.934041);
  const [address, setAddress] = useState('');

  const findLocation = () => {
    Geocoder.from(address)
            .then(json => {
              let location = json.results[0].geometry.location;
              setLat(location.lat);
              setLng(location.lng);
            })
            .catch(error => console.warn(error));
        }
            

  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }}
      >
        <Marker 
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
        />
      </MapView>
      <KeyboardAvoidingView style={styles.buttons} behavior='padding' enabled>
        <TextInput style={styles.tInput}
          onChangeText={(address) => setAddress(address)} />
        <Button onPress={findLocation} title="Find" />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue'
  },
  map: {
    flex: 8
  },
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white'
  },
  buttons: {
    flex: 2,
    alignItems: 'center'
  },
});