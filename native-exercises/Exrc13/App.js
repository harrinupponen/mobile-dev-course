import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {Input, Button, Header, ListItem} from 'react-native-elements';
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
      <Header 
        centerComponent={{text: 'SHOPPING LIST'}}
      />
      <View style={{marginTop: 50}}>
          <Input
            placeholder='Add the product name here'
            label='PRODUCT'
            onChangeText={(product) => setProduct(product)} />
          <Input
            placeholder='Add the amount here'
            label='AMOUNT'
            onChangeText={(amount) => setAmount(amount)}/>
          <Button raised icon={{name: 'save'}} onPress={saveItem} title='ADD' />
      </View>  
      <FlatList contentContainerStyle={{marginTop: 30}}
        keyExtractor={item => item.id.toString()}
        data={shopItems}
        renderItem = {({item}) => (
            <ListItem
            title={item.product}
            subtitle={item.amount}
            rightTitle='Bought'
            bottomDivider
            chevron={{color: 'black'}}
            onPress={() => deleteItem(item.id)}
            />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    
    justifyContent: 'center'
  },
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white'
  },
});