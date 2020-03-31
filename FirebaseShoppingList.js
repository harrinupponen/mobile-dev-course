import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
  //Add here the Firebase project config data
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default function App() {

  firebase.database().ref('items/')

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setShopItems(prods);
    })
  }, [])

  const saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    );
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
          <TextInput style={styles.tInput}
            placeholder='Product'
            onChangeText={(product) => setProduct(product)} />
          <TextInput style={styles.tInput}
            placeholder='Amount'
            onChangeText={(amount) => setAmount(amount)}/>
          <Button onPress={saveItem} title='Add to List' />
      </View>
      <Text style={{marginTop: 20, fontSize: 16}}>Shopping List</Text>  
      <FlatList style={{marginTop: 30}}
      
        data={shopItems}
        renderItem={({item}) =>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.product}, {item.amount}</Text>
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: 250,
    backgroundColor: 'white'
  },
});