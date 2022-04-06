import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'
import WorkoutLogNavigator from './screens/WorkoutLogNavigator'

import Tabs from './navigation/tabs'

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

export default function App() {
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
        <Stack.Screen name='Home' options={{headerShown: false, gestureEnabled: false}} component={Tabs}/>
        <Stack.Screen name='Register' options={{headerShown: false, gestureEnabled: true}} component={Register}/>
      </Stack.Navigator> 
      {/* <Drawer.Navigator
          drawerType="front"
          initialRouteName="Settings"
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}
      >
      </Drawer.Navigator> */}
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
