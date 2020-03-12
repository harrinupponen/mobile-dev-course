import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, KeyboardAvoidingView, Keyboard, Picker} from 'react-native';

export default function App() {

  const [amount, setAmount] = useState('');
  const [rateList, setRateList] = useState([]);
  const [rate, setRate] = useState('');
  const [index, setIndex] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    getLatestRates();
  }, [])

  const getLatestRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=35883809298eeb78543a2eb2765ac0c8&format=1';
    fetch(url)
    .then(resp => resp.json())
    .then(respJson => {
      setRateList(respJson.rates);
    })
  }

  const convertAmount = () => {
    setConvertedAmount((parseInt(amount) / rate).toFixed(2));
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Image style={{width: 200, height: 200}} source={{uri:
          'https://www.tamperelainen.fi/sites/default/files/styles/free_w768_-_esm_2018/public/neo/files/1249364.jpg?itok=7ebuZLDy'}} />
        <Text style={{marginTop: 30, fontSize: 20}}>{convertedAmount} €</Text>
        <View style={styles.inputAndPicker}>
          <TextInput
            keyboardType="numeric"
            style={styles.tInput}
            onChangeText={(amount) => setAmount(amount)}
          />
          <Picker
            style={{width: 100, height: 50}}
            selectedValue={rate}
            onValueChange={
              (itemValue, itemIndex) => {
                setRate(itemValue);
                setIndex(itemIndex);
              }
            }>
            {Object.keys(rateList).map((k) => {
              return <Picker.Item label={k} value={rateList[k]} key={index} />
              })
            }
          </Picker>
          <Button onPress={convertAmount} title="Convert" />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  inputAndPicker: {
    flexDirection: 'row'
  },
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: 100,
    backgroundColor: '#ffffff70'
  },
});