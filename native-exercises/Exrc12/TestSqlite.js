import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  const db = SQLite.openDatabase('coursedb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key' +
      ' not null, credits int, title text);');
    }, null, updateList);
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into course (credits, title) values (?, ?);',
      [parseInt(credit), title]);
    }, null, updateList);
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
      setCourses(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from course where id = ?;',
      [id]);
    }, null, updateList);
  }
            

  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
          <TextInput style={styles.tInput}
            placeholder='Title'
            onChangeText={(title) => setTitle(title)} />
          <TextInput style={styles.tInput}
            placeholder='Credit'
            onChangeText={(credit) => setCredit(credit)}
            keyboardType='numeric' />
          <Button onPress={saveItem} title='Save' />
      </View>  
      <FlatList style={{marginTop: 30}}
        keyExtractor={item => item.id.toString()}
        data={courses}
        renderItem={({item}) =>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.title}, {item.credits}</Text>
            <Text style={{color: 'red', marginLeft: 20}} onPress={() => deleteItem(item.id)}>Done</Text>
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