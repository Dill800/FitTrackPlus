import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BottomSheet } from 'react-native-btr';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { updateUsername } from '../redux/actions/user';
import dateformat from "dateformat";
import { v4 as uuid } from 'uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios'
import config from '../backend/config/config.js'

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const CircleButton = props => (
  <TouchableOpacity
    style={{
      margin: props.margin,
      height: props.size,
      width: props.size,
      backgroundColor: props.color,
      // alignItems: 'center',
      // justifyContent: 'center',
      borderRadius: props.size * 2,
    }}
    onPress={props.onPress}>
    <Text style={{color: props.textColor, fontSize: props.fontSize, alignSelf: 'center'}}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const WorkoutLogDetail = ({navigation, route}) => {
  
  // Redux and navigation
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const theme = useTheme();
  const navi = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    input_box: {
      width: "75%",
      height: 70,
      marginBottom: 25,
    },
    input_title: {
      color: theme.colors.text,
      fontSize: 25,
      marginBottom: 5
    },
    input_placeholder: {
      flex: 0,
      height: 40,
      paddingHorizontal: 20,
      borderRadius: 10,
      color: theme.colors.text,
      backgroundColor: theme.colors.secondary,
    },
    btn_shape: {
      backgroundColor: "rgba(99,206,237,1)",
      borderRadius: 10,
      width: "45%",
      height: 50,
      marginBottom: 15,
      marginHorizontal: 15,
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
      height: '75%',
      justifyContent: 'flex-start',
      paddingTop: "10%"
    },
    btn_box: {
      flexDirection: "row",
      width: "95%",
      alignSelf: "center",
      justifyContent: "center",
      top: 300
  },
});

  // Hooks
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [numSets, setNumSets] = useState('');
  const [numReps, setNumReps] = useState('');
  const [weight, setWeight] = useState('');

  const scroll = useRef();

  // Toggling the visibility state of the bottom sheet
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  // Add exercise to Redux and DB when form is completed
  const addExercise = () => {

    if(name == '' || numSets == '' || numReps == '' || weight == '') {
      return;
    }

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

  const deleteExerciseAlert = (ex_id, ex_name,) => {
    Alert.alert(
      "Delete exericse",
      "Are you sure you want to remove \nthe exercise \"" + ex_name + "\" from this workout log?",
      [{
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => deleteExercise(ex_id)
        }]);
  }

  const deleteExercise = (ex_id) => {

    // Get log and remove exercise
    const data = userData.username; 
    const workoutloglist = data.workoutlogList

    // Iterate and find the workout log we want
    for(let i = 0; i < workoutloglist.length; i++){

      // Workout log match
      if(workoutloglist[i].id  == route.params.id){

        // Iterate through all exercises
        for(let j = 0; j < workoutloglist[i].exercises.length; j++){
          if(workoutloglist[i].exercises[j].exid == ex_id){
            workoutloglist[i].exercises.splice(j, 1)
          }
        }
      }
    }
    
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
  }

  const closer = () => {
    setVisible(false)
  }

  return (
    <HideKeyboard>
    <View style={styles.container}>
      <View style={{backgroundColor: theme.colors.card, borderRadius: 15, padding: 15, width: "95%", height: "95%"}}>
        {/* <Text style={{color: theme.colors.text, fontSize: 25, fontWeight: "600", marginTop: -5, }}>{dateformat(route.params.name, 'm/d/yyyy')}: Workout Details</Text> */}
        <Text style={{color: theme.colors.text, alignSelf: 'center', fontSize: 30, marginTop: 20}}>Workout Details</Text>
        <Text style={{color: theme.colors.text, alignSelf: 'center', fontSize: 25, marginTop: 10, marginBottom: 5}}>{dateformat(route.params.name, 'mmmm dd, yyyy')}</Text>
        <View style={[{marginVertical: 10, borderBottomWidth: 1}]} borderBottomColor={themeReducer.theme ? "white" : "black"}/>

        {
        route.params.exercises.map(exercise =>
        // <View key={exercise.exid} style={{flex: 1}}>
        <View key={exercise.exid} style={{flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", marginVertical: 10, width: '95%'}}>
          <TouchableOpacity style={{ backgroundColor: "#800040", padding: 5, borderRadius: 10 }} onPress={() => deleteExerciseAlert(exercise.exid, exercise.name)}>
            <Text style={styles.btn_text}>🗑️</Text>
          </TouchableOpacity>
          <Text style={{color: theme.colors.text, fontSize: 18, fontWeight: "600", alignSelf: 'center', marginHorizontal: 10}}>{exercise.name}:   |   {exercise.sets}x{exercise.reps}   |   {exercise.weight} lbs</Text>     
          {/* <CircleButton text="" size={20} color="#979c9c" textColor="white" margin={10} fontSize={20} onPress={() => deleteExerciseAlert(exercise.exid, exercise.name)}/> */}
        </View>
        </View>
        )}

      {/* Button to add exercises */}
      <View style={styles.btn_box}>
      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "rgba(153,50,245,1)" }]}onPress={toggleBottomNavigationView}>
        <Text style={styles.btn_text}>Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#800040" }]} onPress={deleteWorkoutLog}>
        <Text style={styles.btn_text}>Delete Log</Text>
      </TouchableOpacity>
      </View>
      </View>

      <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
      
        <KeyboardAwareScrollView ref={scroll} bounces={false} keyboardOpeningTime={0} showsVerticalScrollIndicator={false} extraHeight={150} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.card, alignItems:'center'}]}>
          
            {/* Form to add exercise */}
            <View style={styles.input_box}>
              <Text style={styles.input_title}>Exercise Name</Text>
              <TextInput placeholder={"Exercise Name"} style={styles.input_placeholder} value={name} onChangeText={e => setName(e)}/>
            </View>

            <View style={styles.input_box}>
              <Text style={styles.input_title}>Number of Sets</Text>
              <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={numSets} onChangeText={e => setNumSets(e)} returnKeyType={'done'}/>
            </View>

            <View style={styles.input_box}>
              <Text style={styles.input_title}>Number of Reps</Text>
              <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={numReps} onChangeText={e => setNumReps(e)} returnKeyType={'done'}/>
            </View>

            <View style={styles.input_box}>
              <Text style={styles.input_title}>Weight</Text>
              <TextInput placeholder={"0"} keyboardType='numeric' style={styles.input_placeholder} value={weight} onChangeText={e => setWeight(e)} returnKeyType={'done'}/>
            </View>

            <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3571f3" }]} onPress={addExercise}>
              <Text style={styles.btn_text}>Add Exercise</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3571f3" }]} onPress={closer}>
              <Text style={styles.btn_text}>Return</Text>
            </TouchableOpacity>

            </View>
          </KeyboardAwareScrollView>
      </BottomSheet>

    </View>
    </HideKeyboard>
  );
}

export default WorkoutLogDetail;