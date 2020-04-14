import React, { useState } from 'react';
import { StyleSheet, Button, View, KeyboardAvoidingView, TextInput, Alert, Keyboard} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('MyGoogleApiKey');

export default function App() {

  const [lat, setLat] = useState(60.201373);  //Default coordinates to start with
  const [lng, setLng] = useState(24.934041);  //Ratapihantie 13, HH Pasila campus
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const findRestaurantsNearByAddress = () => {
    Geocoder.from(address)
        .then(json => {
          let location = json.results[0].geometry.location;
          const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
          + 'location=' + location.lat + ',' + location.lng + '&radius=1000&type=restaurant&key=MyGoogleApiKey';
          setLat(location.lat);
          setLng(location.lng);
          fetch(url)
          .then((resp) => resp.json())
          .then((json) => {
            console.log(json.results)
            setRestaurants(json.results)
            })
            .catch((error) => {
              Alert.alert('Error')
            })
          })
    Keyboard.dismiss()
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
        {restaurants.map(marker => (
          <Marker
          key={marker.id}
          title={marker.name}
          description={marker.vicinity}
          coordinate={{
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng
          }}
        />
        ))}
      </MapView>
      <KeyboardAvoidingView style={styles.buttons} behavior='padding' enabled>
        <TextInput style={styles.tInput}
          onChangeText={(address) => setAddress(address)}
        />
        <Button onPress={findRestaurantsNearByAddress} title="Find Restaurants" />
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