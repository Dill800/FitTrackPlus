import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';
import { updateUsername } from '../redux/actions/user';
import dateformat from "dateformat";
import { v4 as uuid } from 'uuid';

import axios from 'axios'
import config from '../backend/config/config.js'

// For stack navigation
import WorkoutLogDetail from './WorkoutLogDetail'

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
        <Stack.Screen name='WorkoutLogDetail' options={{headerShown: false, gestureEnabled: true}} component={WorkoutLogDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const WorkoutLogCard = (props) => {
  
  const theme = useTheme();
  const navi = useNavigation();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);


  const date_clean = new Date(props.name)
  return (
    <View
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: 350,
        height: 110,
        marginTop: 8,
      }}
    >
      <TouchableOpacity style={{backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "95%", height: "95%",}}
        onPress={() => navi.navigate("WorkoutLogDetail", props)}
      >
        <Text style={{color: theme.colors.text, fontSize: 23, fontWeight: "600", marginTop: -5, }}>{dateformat(date_clean, 'DDDD - m/d/yyyy')}</Text>
        <View style={[{marginBottom: 5, borderBottomWidth: 1,}]} borderBottomColor={themeReducer.theme ? "white" : "black"}/>
        
        {props.exercises.slice(0,3).map((exercise, index) =>
          <Text key={""+exercise+index} style={{color: theme.colors.text}}>{exercise.name} {exercise.sets}x{exercise.reps} - {exercise.weight}</Text>     
        )}
      </TouchableOpacity>

    </View>
  );
}


const WorkoutLogDashboard = ({navigation}) => {
  
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
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
      borderRadius: 15,
      width: "98%",
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

  // Redux
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  // Hooks
  const [date, setDate] = useState(new Date(Date.now()));
  const [visible, setVisible] = useState(false);

  // Toggling the visibility state of the bottom sheet
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  // DEBUG ON DATESELECTOR CHANGE
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(currentDate)
  };

  const debugUser = () => {
    console.log(userData.username)
  } 

  const createWorkoutLog = () => {

    // Append new workout log to store
    const data = userData.username;

    // Generate 8-digit UUID for key component for later rendering
    const wol_id = uuid().slice(0,8)

    let ex1 = {
      exid: uuid().slice(0,8),
      name: "bid is goat",
      sets: 5,
      reps: 7,
      weight: 20
    }
    let ex2 = {
      exid: uuid().slice(0,8),
      name: "bid is goat",
      sets: 5,
      reps: 7,
      weight: 20
    }
    let ex3 = {
      exid: uuid().slice(0,8),
      name: "ben ching",
      sets: 5,
      reps: 6,
      weight: 2120
    }
    let ex4 = {
      exid: uuid().slice(0,8),
      name: "ben ching",
      sets: 5,
      reps: 6,
      weight: 2120
    }

    let newlog = {
      id: wol_id,
      date: date,
      exercises: new Array()
    }
    console.log(newlog)
    // data.workoutlogList = newlog
    data.workoutlogList.push(newlog);

    // Update the store after writing the new workout log
    // TODO ALSO SAVE TO DATABASE
    dispatch(updateUsername(data))
  }

//   // Update on every component render
//   useEffect(() => {

// // Function definition
// async function getWorkoutLogList() {
//   axios.get('http://' + config.ipv4 + ':5000/user/get', {
//     params: {
//       username: userData.username.username
//     }
//   })
//   .then(function (response) {
//     // console.log("raeeched")
//     // console.log(response.data)
//   	let jsonrep = (JSON.parse(JSON.stringify(response.data)))
//     console.log(jsonrep.workoutlogList)
//   })
//   .catch(function (err) {
// 	  console.log(err);
//   })
// }    

// // Function call
// getWorkoutLogList();
  
//   });

  return (
    <View style={styles.container}>

        <View style={[styles.exercise_container, {marginBottom: 10}]}>
          <View
            style={[
              styles.title_box,
              { backgroundColor: "#66059e", marginVertical: 10 },
            ]}
          >
            <Text style={styles.title}>All Workouts 🏋️</Text>
          </View>

          <ScrollView horizontal={false} style={styles.box} contentContainerStyle={{paddingTop: 7, paddingBottom: 10}}>
            {userData.username.workoutlogList.map(workoutlog =>
                <WorkoutLogCard id={workoutlog.id} key={workoutlog.id} name={workoutlog.date.toString()} exercises={workoutlog.exercises}/>
            )}
          </ScrollView> 

        </View>

      <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
        <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.secondary, }]}>
        
        <DateTimePicker style={{width: '90%', alignSelf: 'center', marginTop: '-10%', marginBottom: '-11%'}} themeVariant={themeReducer.theme ? "dark" : "light"} value={date} mode={'date'} onChange={onChange} display="inline"/>
        <View style={{alignItems:'center', }}>
          <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3",  }]} onPress={createWorkoutLog}>
            <Text style={styles.btn_text}>Done</Text>
          </TouchableOpacity>
        </View>

        </View>
      </BottomSheet>

      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3" }]}onPress={toggleBottomNavigationView}>
          <Text style={styles.btn_text}>Add New Workout</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3" }]}onPress={debugUser}>
          <Text style={styles.btn_text}>DEBUG USER</Text>
      </TouchableOpacity> */}
      
    </View>
);
}

export default WorkoutLogNavigator;