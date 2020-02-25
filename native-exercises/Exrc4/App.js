import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {

  const [shopItem, setShopItem] = useState(0);
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([...data, {key: shopItem}]);
  }
  const clearList = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
        <View style={styles.text}>
            <TextInput
            keyboardType="numeric"
            style={styles.tInput}
            onChangeText={(shopItem) => setShopItem(shopItem)}
            />
        </View>    
        <View style={styles.buttons}>
            <Button onPress={addItem} title="Add" />
            <Button onPress={clearList} title="Clear" />
        </View>
        <View style={styles.history}>
            <Text>Shopping List:</Text>
            <FlatList
            data={data}
            renderItem={({item}) =>
            <Text>{item.key}</Text>
            }/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center'
  },
  tInput: {
    borderColor: 'blue',
    width: 100,
    borderWidth: 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  history: {
      alignItems: 'center'
  }
});