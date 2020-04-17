import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard} from 'react-native';

export default function Calculator(props) {

  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [result, setResult] = useState(0);
  const [data, setData] = useState([]);

  const calcSum = () => {
    const sum = parseInt(numberOne) + parseInt(numberTwo);
    const item = numberOne + ' + ' + numberTwo + ' = ' + sum;
    setResult(sum);
    setData([...data, {key: item}]);
    Keyboard.dismiss();
  }
  const calcSub = () => {
    const sum = parseInt(numberOne) - parseInt(numberTwo);
    const item = numberOne + ' - ' + numberTwo + ' = ' + sum;
    setResult(sum);
    setData([...data, {key: item}]);
    Keyboard.dismiss();
  }
  
  const {navigate} = props.navigation;
    

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
        <Button onPress={() => navigate('History', {history: data})} title="History ->" />
    </View>
  );
}

Calculator.navigationOptions = ({navigate}) => ({title: 'Calculator'});

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
  }
});