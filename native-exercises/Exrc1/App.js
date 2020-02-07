import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';

export default function App() {

  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [result, SetResult] = useState(0);

  const calcSum = () => {
    const sum = parseInt(numberOne) + parseInt(numberTwo);
    SetResult(sum);
  }
  const calcSub = () => {
    const sum = parseInt(numberOne) - parseInt(numberTwo);
    SetResult(sum);
  }

  return (
    <View style={styles.container}>
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
     
      <View style={styles.buttons}>
        <Button onPress={calcSum} title="+" />
        <Button onPress={calcSub} title="-" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tInput: {
    borderColor: 'blue',
    width: 100,
    borderWidth: 2,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
});
