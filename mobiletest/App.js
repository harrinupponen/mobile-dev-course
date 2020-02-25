import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

export default function App() {
    const [secretNumber, setSecretNumber] = useState(0);
    const [givenNumber, setGivenNumber] = useState('');
    const [guesses, setGuesses] = useState(0);
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        start();
    },[])

    const  start = () => {
        setSecretNumber(Math.floor(Math.random() * 100) +1)
        setAdvice('Guess a number between 1-100')
        setGuesses(0)
    }

    const check = () => {
        setGuesses(guesses +1)
        if(givenNumber < secretNumber) {
            setAdvice('Your guess ' + givenNumber + ' is too low')
        }
        else if(givenNumber > secretNumber) {
            setAdvice('Your guess ' + givenNumber + ' is too high')
        }
        else {
            Alert.alert('You guessed the correct number in ' + guesses + ' guesses')
            start()
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tInput: {
        borderColor: 'blue',
        width: 100,
        borderWidth: 2
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
});