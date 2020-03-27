import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, AsyncStorage} from 'react-native';

export default function App() {

  const [secretNumber, setSecretNumber] = useState(0);
  const [givenNumber, setGivenNumber] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [advice, setAdvice] = useState('');
  const [highScore, setHighScore] = useState('');

  useEffect(() => {
    start();
    setDefaultValueToAsyncStorage();
  }, [])

  const setDefaultValueToAsyncStorage = () => {
    try {
      AsyncStorage.setItem('hScore', JSON.stringify(999));
    } catch (e) {
      Alert.alert('Error saving data')
    }
  }

  const start = () => {
    setSecretNumber(Math.floor(Math.random() * 100) +1)
    setAdvice('Guess a number between 1-100')
    setGuesses(0)
  }

  const check = () => {
    setGuesses(guesses + 1);
    if(givenNumber < secretNumber) {
      setAdvice('Your guess ' + givenNumber + ' is too low')
    }
    if(givenNumber > secretNumber) {
      setAdvice('Your guess ' + givenNumber + ' is too high')
    }
    if(givenNumber == secretNumber) {
      Alert.alert('You guessed the correct number in ' + (guesses+1) + ' guesses')
      compareAndSaveHighScore()
      start()
    }
  }

  const compareAndSaveHighScore = async () => {
    let retreivedValue = await AsyncStorage.getItem('hScore');
    let prevValue = JSON.parse(retreivedValue);
    if(guesses < prevValue) {
     await AsyncStorage.setItem('hScore', guesses);
    }
    getHighScore()
  }

  const getHighScore = async () => {
    try {
      let retreivedValue = await AsyncStorage.getItem('hScore');
      setHighScore(JSON.parse(retreivedValue))
    } catch (e) {
      Alert.alert('Error retreiving data')
    }
  }

  return (
    <View style={styles.container}>
      <Text>{secretNumber} {advice} {guesses}</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.tInput}
        onChangeText={(givenNumber) => setGivenNumber(givenNumber)}
      />
      <View style={styles.buttons}>
        <Button onPress={check} title="Make a guess" />
      </View>
  <Text>High score: {highScore}</Text>
    </View>
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
  tInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    width: '50%',
    backgroundColor: '#ffffff70'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
});

try {
  let item = await AsyncStorage.getItem('hScore');
  setSavedValue(JSON.parse(item));
} catch (e) {
  Alert.alert('Error retrieving data')
}