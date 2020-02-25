import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {

  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [result, setResult] = useState(0);
  const [data, setData] = useState([]);

  const calcSum = () => {
    const sum = parseInt(numberOne) + parseInt(numberTwo);
    const item = numberOne + ' + ' + numberTwo + ' = ' + sum;
    setResult(sum);
    setData([...data, {key: item}]);
  }
  const calcSub = () => {
    const sum = parseInt(numberOne) - parseInt(numberTwo);
    const item = numberOne + ' - ' + numberTwo + ' = ' + sum;
    setResult(sum);
    setData([...data, {key: item}]);
  }

  return (
    <View style={styles.container}>
        <View style={styles.text}>
            <Text>Result: {result}</Text>
            <TextInput
            keyboardType="numeric"
            style={styles.tInput}
            onChangeText={(numberOne) => setNumberOne(numberOne)}
            />
            <TextInput
            keyboardType="numeric"
            style={styles.tInput}
            onChangeText={(numberTwo) => setNumberTwo(numberTwo)}
            />
        </View>    
        <View style={styles.buttons}>
            <Button onPress={calcSum} title="+" />
            <Button onPress={calcSub} title="-" />
        </View>
        <View style={styles.history}>
            <Text>History:</Text>
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