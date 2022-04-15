import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react'
import {NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'
import Settings from './screens/Settings'
import Meals from './screens/Meals'
import Macros from './screens/Macros'
import EditMacros from './screens/EditMacros'
import WeightLog from './screens/WeightLog'
import Chat from './screens/Chat';

import WorkoutLogNavigator from './screens/WorkoutLogNavigator'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider, useSelector} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './redux/state/store'

import Tabs from './navigation/tabs'
import reducers from "./redux/state/reducers";


const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

const DarkerTheme = {
  dark: true,
  colors: {
    primary: '#44adff',
    background: '#121212',
    secondary: '#404040',
    card: '#181818',
    text: 'white',
    third: "rgba(153,50,245,1)",
  },
};

const DefaulterTheme = {
  dark: false,
  colors: {
      primary: '#71ebeb',
      background: '#f2f2f2',
      secondary: 'white',
      card: '#d5dadf',
      text: 'black',
      third: 'rgba(178,108,233,1)',
  }
}


export default function AppWrapper() {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const [userData, setUserData] = useState(null);
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);

  return (

    // <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer theme={themeReducer.theme ? DarkerTheme : DefaulterTheme} userData={userData} setUserData={setUserData}>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
            <Stack.Screen name='Home' options={{headerShown: false, gestureEnabled: false}} component={Tabs}/>
            <Stack.Screen name='Register' options={{headerShown: false, gestureEnabled: true}} component={Register}/>
            <Stack.Screen name='Settings' options={{headerShown: false, gestureEnabled: true}} component={Settings}/>
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
      </PersistGate>
    // </Provider>
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
