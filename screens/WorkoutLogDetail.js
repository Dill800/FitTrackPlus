import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BottomSheet } from 'react-native-btr';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { updateUsername } from '../redux/actions/user';
import { v4 as uuid } from 'uuid';

import axios from 'axios'
import config from '../backend/config/config.js'

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    input_box: {
      width: "75%",
      height: 40,
      marginBottom: 25,
    },
    input_title: {
      fontSize: 40,
    },
    input_placeholder: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      color: "#121212",
      backgroundColor: "rgba(230,230,230,1)",
    },
    btn_shape: {
      backgroundColor: "rgba(99,206,237,1)",
      borderRadius: 10,
      width: "30%",
      height: 40,
      marginBottom: 15,
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
      height: '85%',
      justifyContent: 'flex-start',
      paddingTop: "15%"
    },
});

const WorkoutLogDetail = ({navigation, route}) => {
  
  // Redux and navigation
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const theme = useTheme();  
  const navi = useNavigation();

  // Hooks
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [numSets, setNumSets] = useState('');
  const [numReps, setNumReps] = useState('');
  const [weight, setWeight] = useState('');

  // Toggling the visibility state of the bottom sheet
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  // Add exercise to Redux and DB when form is completed
  const addExercise = () => {

    // Generate 8-digit UUID for key component for later rendering
    const exid = uuid().slice(0,8)

    let exerciseData = {
      exid: exid,
      name: name,
      sets: numSets,
      reps: numReps,
      weight: weight,
    }

    // console.log("VERIFY DATA FORM", exerciseData)

    // Clear form after submitting
    setName("")
    setNumSets("")
    setNumReps("")
    setWeight("")

    // Bodgy Redux querying
    const data = userData.username
    const workoutloglist = data.workoutlogList

    // Iterate and find the workout log we want
    let index = 0;
    for(let i = 0; i < workoutloglist.length; i++){
      if(workoutloglist[i].id  == route.params.id){
        index = i
      }
    }
    workoutloglist[index].exercises.push(exerciseData);

    // Update the store after writing the new workout log
    // TODO ALSO SAVE TO DATABASE
    dispatch(updateUsername(data))
  }

  const deleteWorkoutLog = () => {

    // Bodgy Redux querying
    const data = userData.username
    const workoutloglist = data.workoutlogList

    // Iterate and find the workout log we want
    let index = -1;
    for(let i = 0; i < workoutloglist.length; i++){
      if(workoutloglist[i].id  == route.params.id){
        index = i
      }
    }

    // Makes sure a workoutlog can't be deleted unless exact match found
    data.workoutlogList.splice(index, (index != -1) ? 1 : 0)
    
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

    // Navigate back to dashboard automatically after deletion
    navi.goBack()  }

  return (
    <HideKeyboard>
    <View style={styles.container}>
      <View style={{backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "95%", height: "95%"}}>
        <Text style={{color: theme.colors.text, fontSize: 23, fontWeight: "600", marginTop: -5, }}>Workout Details</Text>
        <View style={[{marginBottom: 5, borderBottomWidth: 1,}]} borderBottomColor={themeReducer.theme ? "white" : "black"}/>

        <Text>{route.params.name}</Text>
        
        {
        route.params.exercises.map(exercise =>
        <Text key={exercise.exid}>{exercise.name} {exercise.sets}x{exercise.reps} - {exercise.weight} - {exercise.exid}</Text>     
        )}

      {/* Button to add exercises */}
      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3571f3" }]}onPress={toggleBottomNavigationView}>
        <Text style={styles.btn_text}>Add Exercise to Log</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#e91d1d" }]} onPress={deleteWorkoutLog}>
        <Text style={styles.btn_text}>Delete Workout Log</Text>
      </TouchableOpacity>
      </View>

      <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
        <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.secondary, alignItems:'center'}]}>
        
          {/* reuse bottomview as quick way to add exercisese */}
          {/* Form to fill add exercise */}
          <View style={styles.input_box}>
            <Text style={styles.input_title}>Exercise Name</Text>
            <TextInput placeholder={"Exercise Name"} style={styles.input_placeholder} value={name + ""} onChangeText={e => setName(e)} />
          </View>

          <View style={styles.input_box}>
            <Text style={styles.input_title}>Number of Sets</Text>
            <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={numSets + ""} onChangeText={e => setNumSets(e)}/>
          </View>

          <View style={styles.input_box}>
            <Text style={styles.input_title}>Number of Reps</Text>
            <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={numReps+ ""} onChangeText={e => setNumReps(e)}/>
          </View>

          <View style={styles.input_box}>
            <Text style={styles.input_title}>Weight</Text>
            <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={weight+ ""} onChangeText={e => setWeight(e)}/>
          </View>

        <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3571f3" }]} onPress={addExercise}>
          <Text style={styles.btn_text}>Add Exercise</Text>
        </TouchableOpacity>

        </View>
      </BottomSheet>

    </View>
    </HideKeyboard>
  );
}

export default WorkoutLogDetail;