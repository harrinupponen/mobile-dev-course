import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SettingsScreen from './components/SettingsScreen';
import HomeScreen from './components/HomeScreen';

const AppNavigator = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Settings: {screen: SettingsScreen}
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}