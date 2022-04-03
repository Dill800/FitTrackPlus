import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'

import Tabs from './navigation/tabs'

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Register />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
