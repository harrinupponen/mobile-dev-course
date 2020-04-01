import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddressList from './components/AddressList';
import Map from './components/Map';

const AppNavigator = createStackNavigator(
{
  AddressList: {screen: AddressList},
  Map: {screen: Map}
}
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}