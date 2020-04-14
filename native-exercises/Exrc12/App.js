import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shopItems, setShopItems] = useState([]);

  const db = SQLite.openDatabase('shoplist.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoplist (id integer primary key' +
      ' not null, product text, amount text);');
    }, null, updateList);
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoplist (product, amount) values (?, ?);',
      [product, amount]);
    }, null, updateList);
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoplist;', [], (_, { rows }) =>
      setShopItems(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoplist where id = ?;',
      [id]);
    }, null, updateList);
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
        keyExtractor={item => item.id.toString()}
        data={shopItems}
        renderItem={({item}) =>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{color: 'red', marginLeft: 20}} onPress={() => deleteItem(item.id)}>Bought</Text>
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