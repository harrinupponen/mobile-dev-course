import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {

  const [text, setText] = useState('');

  const buttonPressed = () => {
    Alert.alert("You typed: " + text);
  }

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TextInput
      style={styles.tInput}
      onChangeText={(text) => setText(text)}
      value={text}
      />
      <Button onPress={buttonPressed} title="Press me" />
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
    borderColor: 'red',
    width: 100,
    borderWidth: 2,
  },
});
