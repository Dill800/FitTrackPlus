import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux'


// For stack navigation
import AddExercise from './AddExercise'
import LogDetailScreen from './LogDetailScreen'
import reducers from "../redux/state/reducers";

const Stack = createNativeStackNavigator();

const DarkerTheme = {
  colors: {
    primary: '#44adff',
    background: '#121212',
    secondary: '#404040',
    card: '#181818',
    text: 'white',
  },
};

const DefaulterTheme = {
  colors: {
      primary: '#71ebeb',
      background: '#f2f2f2',
      secondary: 'white',
      card: '#d5dadf',
      text: 'black'
  }
}

const WorkoutLogNavigator = ({navigation}) => {

  const themeReducer = useSelector(({ themeReducer }) => themeReducer);

  return (
    <NavigationContainer theme={themeReducer.theme ? DarkerTheme : DefaulterTheme} independent={true}>
      <Stack.Navigator initialRouteName='WorkoutLog'>
        <Stack.Screen name='WorkoutLog' options={{headerShown: false, gestureEnabled: true}} component={WorkoutLogDashboard}/>
        <Stack.Screen name='AddExercise' options={{headerShown: false, gestureEnabled: true}} component={AddExercise}/>
        <Stack.Screen name='LogDetailScreen' options={{headerShown: false, gestureEnabled: true}} component={LogDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Exercise = ({navigation}) => {
  const theme = useTheme();
  const navi = useNavigation();

  return (
    <View
      style={{
        alignItems: "center",
        width: 340,
        height: 100,
        paddingTop: 8,
        marginBottom: 15,
      }}
    >
      <TouchableOpacity style={{backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "95%", height: "95%",}}
        onPress={() => navi.navigate("LogDetailScreen")}
      >
        <Text style={{color: theme.colors.text, fontSize: 25, fontWeight: "bold" }}>name</Text>
        <Text style={{color: theme.colors.text}}>{"Duration: min"}</Text>
        <Text style={{color: theme.colors.text}}>{"Duration: min"}</Text>     
      </TouchableOpacity>

    </View>
  );
}


const WorkoutLogDashboard = ({navigation}) => {

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    progress: {
      width: "95%",
      height: 125,
      marginTop: 15,
      alignItems: "center",
    },
    title_box: {
      backgroundColor: "rgba(74,144,226,1)",
      borderRadius: 10,
      width: "95%",
      height: 40,
      justifyContent: "center",
    },
    title: {
      color: "rgba(255,255,255,1)",
      fontSize: 22,
      alignSelf: "center",
    },
    progress_container: {
      flexDirection: "row",
      width: "100%",
      marginTop: 20,
      justifyContent: "center",
    },
    progress_box: {
      backgroundColor: "rgba(213,218,223,1)",
      width: "40%",
      height: 55,
      borderRadius: 10,
      marginHorizontal: 25,
    },
    progress_title: {
      color: "#121212",
      alignSelf: "center",
      marginVertical: 4,
    },
    progress_value: {
      color: "#121212",
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
    },
    exercise_container: {	
      width: "95%",	
      height: "75%",	
      alignItems: "center",	
    },	    
    box: {
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      width: "95%",
      height: 275,
      alignSelf: "center",
    },
    btn_box: {
      flexDirection: "row",
      width: "75%",
      justifyContent: "center",
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

  return (
    <View style={styles.container}>

        <View style={styles.exercise_container}>
          <View
            style={[
              styles.title_box,
              { backgroundColor: "#66059e", marginVertical: 10 },
            ]}
          >
            <Text style={styles.title}>All Workouts 🏋️</Text>
          </View>

          <ScrollView horizontal={false} style={styles.box}>
            <Exercise></Exercise>
            <Exercise></Exercise>
            <Exercise></Exercise>
            <Exercise></Exercise>
            <Exercise></Exercise>
            
          </ScrollView>

        </View>

      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3" }]}
        onPress={() => navigation.navigate("AddExercise")}
      >
          <Text style={styles.btn_text}>Add New Workout</Text>
      </TouchableOpacity>

    </View>
);
}

export default WorkoutLogNavigator;