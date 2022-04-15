import React, {useState, useEffect} from 'react';
import DropdownMenu from 'react-native-dropdown-menu';
import { View, Text, StyleSheet } from "react-native";
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

const WorkoutGraphs = (exercises) => {
    
  const [exerciseForGraph, setSelectedExercise] = useState('')
  const userData = useSelector(state => state.user);

  const exercises = new Array

  const populateExerciseArray = () => {

  }

// const NaviHandler = (para) => {

// // Accessing state lags behind use parameter
// console.log("DIRECT", para)

// if(para == "Weight Graphs"){
// console.log("WEIGHT GRAPH PATH")
// navi.goBack()
// }
// else{
// console.log("DETAIL PATH")
// navi.navigate(para)
// }
// }

  return (
    <View style={{flex: 1}}>
      <View style={{height: 64}} />
      <DropdownMenu
        style={{flex: 0.5}}
        bgColor={'grey'}
        tintColor={'#000000'}
        activityTintColor={'red'}
        handler={(selection, row) => {
          populateExerciseArray()
          setSelectedExercise(exercises[selection][row])}
        }
        data={data}
      >

        <View style={{flex: 1}}>
          <Text>
            {/* configure gaph */}
            {this.state.text} is the best language in the world
          </Text>
        </View>

      </DropdownMenu>
    </View>
  );
}

export default WorkoutGraphs;