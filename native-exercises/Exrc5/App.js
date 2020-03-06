import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Calculator from './components/Calculator';
import History from './components/History';

const AppNavigator = createStackNavigator(
{
  Calculator: {screen: Calculator},
  History: {screen: History}
}
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}