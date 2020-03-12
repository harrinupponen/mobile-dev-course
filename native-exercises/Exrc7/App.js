import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, KeyboardAvoidingView, Keyboard} from 'react-native';

export default function App() {

  const [listItems, setListItems] = useState([]);
  const [keyword, setKeyword] = useState('');

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + keyword;
    fetch(url)
    .then(resp => resp.json())
    .then(respJson => {
      setListItems(respJson.results);
    })
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <FlatList
            style={styles.list}
            data={listItems}
            renderItem = {({item}) =>
            <View>
            <Text>{item.title}</Text>
            <Image style={{width:70, height:70}} source={{uri: item.thumbnail}} />
            </View>
        }/>
        <TextInput
            style={styles.tInput}
            onChangeText={(keyword) => setKeyword(keyword)}
        />
        <View style={styles.buttons}>
            <Button onPress={getRecipes} title="Find" />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  list: {
    marginTop: 50
  },
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    backgroundColor: '#ffffff70'
  },
  buttons: {
    marginBottom: 50
  },
});