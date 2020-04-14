import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {Input, Button, ListItem} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function AddressList(props) {

  const [address, setAddress] = useState('');
  const [addressItems, setAddressItems] = useState([]);

  const db = SQLite.openDatabase('addresslist.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresslist (id integer primary key' +
      ' not null, address text);');
    }, null, updateList);
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresslist (address) values (?);',
      [address]);
    }, null, updateList);
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
      setAddressItems(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from addresslist where id = ?;',
      [id]);
    }, null, updateList);
  }

  const {navigate} = props.navigation;
            
  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
          <Input
            placeholder='Add the address here'
            label='Address'
            onChangeText={(address) => setAddress(address)} />
          <Button raised icon={{name: 'save'}} onPress={saveItem} title='Add to the list' />
      </View>  
      <FlatList contentContainerStyle={{marginTop: 30}}
        keyExtractor={item => item.id.toString()}
        data={addressItems}
        renderItem = {({item}) => (
            <ListItem
            title={item.address}
            rightTitle='Show Map'
            bottomDivider
            chevron={{color: 'black'}}
            onPress={() => navigate('Map', {place: item.address})}
            onLongPress={() => deleteItem(item.id)}
            />
        )}
      />
    </View>
  );
}

AddressList.navigationOptions = ({navigate}) => ({title: 'Address List'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
});