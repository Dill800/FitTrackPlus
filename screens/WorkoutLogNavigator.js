import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';
import { updateUsername } from '../redux/actions/user';
import dateformat from "dateformat";
import { v4 as uuid } from 'uuid';

import axios from 'axios'
import config from '../backend/config/config.js'

// For stack navigation
import WorkoutLogDetail from './WorkoutLogDetail'
import WorkoutGraphs from './WorkoutGraphs'

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

  const options = {
    headerShown: true, 
    gestureEnabled: true,
    headerStyle: {
        backgroundColor: themeReducer.theme ? DarkerTheme.colors.primary : DefaulterTheme.colors.primary,
        shadowColor: 'transparent',
    },
    headerTitleStyle: {
        color: 'black'
    },
    headerTintColor: 'black',
    headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
                source={require('../assets/settings.png')}
                style={{
                    width: 25,
                    height: 25,
                    // right: 20
                }}
            />
        </TouchableOpacity>
    )
  }

  return (
    <NavigationContainer theme={themeReducer.theme ? DarkerTheme : DefaulterTheme} independent={true}>
      <Stack.Navigator initialRouteName='Workout Log'>
        <Stack.Screen name='Workout Log' options={options} component={WorkoutLogDashboard}/>
        <Stack.Screen name='Log Detail' options={options} component={WorkoutLogDetail}/>
        <Stack.Screen name='Exercise Graphs' options={options} component={WorkoutGraphs}/>
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
        height: 'auto',
        marginTop: 8,
        marginBottom: 10
      }}
    >
      <TouchableOpacity style={{backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "95%", height: "95%",}}
        onPress={() => navi.navigate("Log Detail", props)}
      >
        <Text style={{color: theme.colors.text, fontSize: 23, fontWeight: "600", marginTop: -5, alignSelf: 'center'}}>{dateformat(date_clean, 'DDDD - m/d/yyyy')}</Text>
        <View style={[{marginBottom: 5, borderBottomWidth: 1, }]} borderBottomColor={themeReducer.theme ? "white" : "black"}/>
        
        {props.exercises.map((exercise, index) =>
          <Text key={""+exercise+index} style={{color: theme.colors.text, paddingVertical: 2, fontSize: 15}}>• {exercise.name} {exercise.sets}x{exercise.reps} - {exercise.weight}</Text>     
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
      marginHorizontal: 100,
      flexDirection: "row",
      width: "75%",
      alignSelf: "center",
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
    // console.log(currentDate)
  };

  // const debugUser = () => {
  //   console.log(userData.username)
  // } 

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

    // Add timestamp to selected date to help in sorting in main dashboard
    const current = new Date();
    const date_with_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), current.getHours(), current.getMinutes(), current.getSeconds())

    let newlog = {
      id: wol_id,
      date: date_with_timestamp,
      exercises: new Array()
      // exercises: new Array(ex1, ex2, ex3, ex4)
    }
    // console.log(newlog)
    // data.workoutlogList = newlog
    data.workoutlogList.push(newlog);

    // Save to Redux and DB
    axios.post('http://' + config.ipv4 + ':5000/user/updateWorkoutLog', {
      username: userData.username.username,
      workoutlogList : data.workoutlogList
    })
    .then(res => {
      // console.log("---------- POST Called to db")
    })
    .catch(e => {
      console.log("error", e)
    })

    dispatch(updateUsername(data))

    toggleBottomNavigationView();
  }

const navi = useNavigation();

const passRef = useRef();
const scrollViewRef = useRef();

const populateExerciseArray = () => {

  // Bodgy Redux querying
  const data = userData.username
  const workoutloglist = data.workoutlogList
  // const exercise_data = new Array()

  // Iterate and find the workout log we want
  let index = 0;
  for(let i = 0; i < workoutloglist.length; i++){

  }

  return new Array()
}

  return (
    <View style={styles.container}>

        <View style={[styles.exercise_container, {marginBottom: 10}]}>

          <View style={[styles.title_box, { backgroundColor: "#66059e", marginVertical: 15 },]}>
            <Text style={styles.title}>All Workouts 🏋️</Text>
          </View>

          <ScrollView 
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })} 
              horizontal={false} style={styles.box} 
              contentContainerStyle={{paddingTop: 7, paddingBottom: 10}}
          >
          

            {/* {userData.username.workoutlogList.map(workoutlog => */}
            {userData.username.workoutlogList.sort(function(a, b){return b.date-a.date}).map(workoutlog =>
                <WorkoutLogCard id={workoutlog.id} key={workoutlog.id} name={workoutlog.date.toString()} exercises={workoutlog.exercises}/>
            )}
          </ScrollView> 

        </View>

      <View style={styles.btn_box}>
        <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#9932f5", marginHorizontal: 10  }]}onPress={toggleBottomNavigationView}>
            <Text style={styles.btn_text}>Add New Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#9932f5", marginHorizontal: 10  }]} onPress={() => navi.navigate("Exercise Graphs", populateExerciseArray())}>
            <Text style={styles.btn_text}>View Graphs</Text>
        </TouchableOpacity>
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

    </View>
);
}

export default WorkoutLogNavigator;