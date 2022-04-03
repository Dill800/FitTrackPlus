import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

// For stack navigation
import AddExercise from './AddExercise'

const Stack = createNativeStackNavigator();


const WorkoutLogDashboard = ({navigation}) => {
  return (
    <View style={styles.container}>

    <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#46ff7e" }]}
      onPress={() => navigation.navigate("AddExercise")}
    >
        <Text style={styles.btn_text}>Add Exercise</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#d446ff" }]}>
        <Text style={styles.btn_text}>placeholder2</Text>
    </TouchableOpacity>

    </View>
);
}


const WorkoutLogNavigator = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='WorkoutLog'>
        <Stack.Screen name='WorkoutLog' options={{headerShown: false, gestureEnabled: true}} component={WorkoutLogDashboard}/>
        <Stack.Screen name='AddExercise' options={{headerShown: false, gestureEnabled: true}} component={AddExercise}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
    formView:{
        flex: 1.5,
        backgroundColor: '#f0f8ff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        alignItems: "center"
    },
    inputView:{
        backgroundColor: "#71ebeb",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    btn_shape: {
      backgroundColor: "rgba(178,108,233,1)",
      borderRadius: 10,
      width: "50%",
      height: 40,
      marginTop: 10,
      justifyContent: "center",
  },
  btn_text: {
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "bold",
  },
})

export default WorkoutLogNavigator;