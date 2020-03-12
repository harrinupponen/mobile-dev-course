import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, AsyncStorage} from 'react-native';

export default function App() {

  const [secretNumber, setSecretNumber] = useState(0);
  const [givenNumber, setGivenNumber] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [advice, setAdvice] = useState('');
  const [highScore, setHighScore] = useState('');

  useEffect(() => {
    start();
  }, [])

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
      saveHighScore()
      Alert.alert('You guessed the correct number in ' + (guesses +1) + ' guesses')
      start()
      
    }
  }

  const usePrevState = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const saveHighScore = () => {
    const prevGuess = usePrevState(guesses);
    if(guesses < prevGuess) {
      AsyncStorage.setItem('hScore', JSON.stringify(guesses));
    }
    setHighScore(AsyncStorage.getItem(JSON.parse('hScore')));
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