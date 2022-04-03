import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'
import WorkoutLogDashboard from './screens/WorkoutLogDashboard'
import AddExercise from './screens/AddExercise'

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
        <Stack.Screen name='Home' options={{headerShown: false, gestureEnabled: false}} component={Home}/>
        <Stack.Screen name='Register' options={{headerShown: false, gestureEnabled: true}} component={Register}/>
        <Stack.Screen name='WorkoutLog' options={{headerShown: false, gestureEnabled: true}} component={WorkoutLogDashboard}/>
        <Stack.Screen name='AddExercise' options={{headerShown: false, gestureEnabled: true}} component={AddExercise}/>
      </Stack.Navigator>
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
