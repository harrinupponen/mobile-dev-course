import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, KeyboardAvoidingView, TextInput, Alert, Keyboard} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('MyGoogleApiKey');

export default function App() {

  const [lat, setLat] = useState(60.201373);
  const [lng, setLng] = useState(24.934041);
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const findRegionByAddress = () => {
    Geocoder.from(address)
        .then(json => {
          let location = json.results[0].geometry.location;
          setLat(location.lat);
          setLng(location.lng);
        })
        .catch(error => console.warn(error));
    Keyboard.dismiss()
  }

  const findRestaurantsNearBy = () => {
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + lat + ',' + lng + '&radius=1000&type=restaurant&key=MyGoogleApiKey';
        fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
          console.log(json.results)
          setRestaurants(json.results)
        })
        .catch((error) => {
          Alert.alert('Error')
        })
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
          onChangeText={(address) => setAddress(address)} />
        <Button onPress={findRegionByAddress} title="Find Region" />
        <Button onPress={findRestaurantsNearBy} title="Show Restaurants" />
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