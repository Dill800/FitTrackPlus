import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import reducers from "../redux/state/reducers";
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';

import config from '../backend/config/config.js'
import axios from 'axios'
import qs from 'qs'


// For stack navigation
import AddExercise from './AddExercise'
import LogDetailScreen from './LogDetailScreen'

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

// Navigate within the workout log tab
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

// TEMP COMPONENT
const Exercise = (props) => {
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
        <Text style={{color: theme.colors.text, fontSize: 25, fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{color: theme.colors.text}}>{props.line1}</Text>     
        <Text style={{color: theme.colors.text}}>{props.line2}</Text>     
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
    bottomNavigationView: {
      borderRadius: 10,
      height: '50%',
      justifyContent: 'center',
    },
  })

  // Hooks
  const userData = useSelector(state => state.user);
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);

  //Toggling the visibility state of the bottom sheet
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log(currentDate)
  };

  
  const createWorkoutLog = () => {

    var data = qs.stringify({
      'username': userData.username.username,
      'datetime': date,
    });

    axios({
      method: 'post',
      url: 'http://' + config.ipv4 + ':5000/workoutlog/createWorkoutLog',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      data : data
    })
    .then(reponse => {
      console.log(JSON.stringify(reponse.data))
    })
    .catch(e => {
      console.log(e)
    })
  }

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
            <Exercise name="April 9, 2022" line1="Bench Press 5x5 - 225" line2="Overhead Press 5x5 - 135"></Exercise>
            <Exercise name="April 5, 2022" line1="Squat 5x5 - 255" line2="Leg Press 4x8 - 180"></Exercise>
            <Exercise name="March 14, 2022 " line1="High-Low Row 4x10 - 60" line2="Lat Pulldown 4x10 - 130"></Exercise>
            <Exercise name="February 22, 2022" line1="Deadlift 5x5 - 315" line2="Weighted Chinups 4x12 - 45"></Exercise>
          </ScrollView>

        </View>

      <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
        <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.text, }]}>
          
        <DateTimePicker style={{width: '90%', alignSelf: 'center', marginTop: '0%', }} value={date} mode={'date'} onChange={onChange} display="inline"/>
        <View style={{alignItems:'center', marginTop:'-7%'}}>
          <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3" }]}onPress={createWorkoutLog}>
            <Text style={styles.btn_text}>Done</Text>
          </TouchableOpacity>
        </View>

        </View>
      </BottomSheet>

      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3" }]}onPress={toggleBottomNavigationView}>
          <Text style={styles.btn_text}>Add New Workout</Text>
      </TouchableOpacity>
      
    </View>
);
}

export default WorkoutLogNavigator;