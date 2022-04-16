import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BottomSheet } from 'react-native-btr';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { updateUsername } from '../redux/actions/user';
import dateformat from "dateformat";
import { v4 as uuid } from 'uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
//import { ScrollView } from 'native-base';

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
      marginTop: 20
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

  const updateWilks = () => {

    let exercises = []
    let megaData = {}
  
    // have object [exercise name] of list of object [date and 1rm]
    let calcMax = (sets, reps, weight) => {
        //return parseInt((100 * weight) / (101.3 - 2.67123 * reps))
        //console.log("reps", reps);
        //console.log("max", parseInt(exp(-0.055 * reps)));
        if (reps == 1) {
            return weight;
        }
        return parseInt((100 * weight) / (52.2 + (41.9 * Math.exp(-0.055 * reps))))
    }
  
    let sameDay = (x, actdate) => {
      //console.log('x', x)
      //console.log('otehr', actdate)
      let k = x.getDate() === actdate.getDate() && x.getMonth() === actdate.getMonth() && x.getFullYear() === actdate.getFullYear();
      //console.log(k)
      return k;
    }
  
  
  
    let getExercises = () => {
      //console.log("Populating exercise stuff")
      let data = userData.username.workoutlogList;
  
      for(let i = 0; i < data.length; i++) {
        let eggs = data[i].exercises;
        let d = data[i].date;
        for(let j = 0; j < eggs.length; j++) {
            let name = String(eggs[j].name).toLowerCase();
            if (name.substring(0,5) == "bench") {
                name = "bench";
            }
  
          if (name in megaData) {
  
            // calculate max
            // see if date exists. if not, add in
            // if date exists and max is greater, update max
            let max = calcMax(eggs[j].sets, eggs[j].reps, eggs[j].weight)
            let vals = megaData[name]
            //console.log(vals)
            if(vals === undefined) {
              console.log('vals is undefined')
              return;
            }
            
  
            let index = vals.findIndex(obj => sameDay(new Date(obj.date), new Date(d))); // <- error, see if obj.date is on same day as d
            
            if(index === -1) {
              //megaData[eggs[j].name] = [];
              megaData[name].push({
                'date': d,
                'max': max
              })
            }
            else {
              // date exists
  
              if(megaData[name][index].max < max) {
                megaData[name][index].max = max;
              }
  
            }
  
  
          }
          else {
  
            // if exercise is new
            megaData[name] = []
            megaData[name].push({
              'date': d,
              'max': calcMax(eggs[j].sets, eggs[j].reps, eggs[j].weight)
            })
  
          }
  
          if(!exercises.includes(name)) {
            if (name.substring(0,5) == "bench") {
                if (!exercises.includes("bench")) {
                    exercises.push("bench");
                }
            }
            else {
                exercises.push(name)
            }
          }
        }
  
      }
      //console.log('exercises unique: ', exercises)
  
      //console.log('megadata: ',megaData)
  
      //console.log('megadata: ',megaData)
  
  
    }
    getExercises()
  
    let wilks = 0;
    let benchMax = 0;
    let squatMax = 0;
    let deadLiftMax = 0;
    for (let exercises in megaData) {
          //console.log(exercises);
          // console.log(megaData[i].toLowerCase());
          if (String(exercises).toLowerCase() == "squat") {
  
              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > squatMax) {
                      squatMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("squat2");
          }
          if (String(exercises).toLowerCase().substring(0,5) == "bench") {
              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > benchMax) {
                      benchMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("bench2");
          }
          if (String(exercises).toLowerCase() == "deadlift") {
              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > deadLiftMax) {
                      deadLiftMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("deadlift2");
          }
  
          // else if (megaData[exercises].toLowerCase().substring(0,5) == "bench") {
          //    // megaData[i].name;
          //     console.log("bench");
          // }
          // else if (megaData[exercises].toLowerCase() == "deadlift") {
          //     //megaData[i].name;
          //     console.log("dead");
          // }
    }
    console.log("start");
    console.log("squat", squatMax);
    console.log("bench", benchMax);
    console.log("deadlift", deadLiftMax);
  
    let W = (parseInt(squatMax) + parseInt(benchMax) + parseInt(deadLiftMax)) / 2.2046;
    console.log("total weight", W);
    console.log("total weight lbs", squatMax + benchMax + deadLiftMax);
  
    let a = -216.0475144
    let b = 16.2606339
    let c = -0.002388645
    let d = -0.00113732
    let e = 7.01863 * Math.pow(10, -6)
    let f = -1.291 * Math.pow(10, -8)
  
    let x = -1;
  
    if ( !userData.username.weightList.length == 0) {
        x = userData.username.weightList[userData.username.weightList.length - 1].weight / 2.2046;
    }
    console.log("bodyweight", x);
    wilks = (W * 500) / (a + (b * x) + (c * Math.pow(x,2)) + (d * Math.pow(x,3))  + (e * Math.pow(x,4)) + (f * Math.pow(x,5)));
    wilks = wilks.toFixed(2);
    let level = "";
    if (wilks >= 414) {
        level = "Elite";
    }
    else if (wilks >= 326) {
        level = "Advanced";
    }
    else if (wilks >= 238) {
        level = "Intermediate";
    }
    else if (wilks >= 200) {
        level = "Novice";
    }
    else {
        level = "Untrained";;
    }
    //setWilks(wilks);
    if (x == -1) {
      wilks = 0;
    }
    console.log("wilks", wilks);
    var data = qs.stringify({
      'username': userData.username.username,
      'wilksScore': wilks 
    });
    var config2 = {
      method: 'post',
      url: 'http://' + config.ipv4 + ':5000/user/updateWilks',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config2)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      let data = userData.username;
      data.wilksScore = wilks;
      dispatch(updateUsername(data))
      //console.log("group name:" + userData.username.groupName);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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

    updateWilks();
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
    updateWilks();
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
    updateWilks();
  }

  const closer = () => {
    setVisible(false)
  }

  return (
    <ScrollView>
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
    </ScrollView>
  );
}

export default WorkoutLogDetail;