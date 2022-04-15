import React, {useState, useEffect} from 'react';
import DropdownMenu from 'react-native-dropdown-menu';
import { useSelector, useDispatch } from 'react-redux'

import { View, Text, StyleSheet } from "react-native";
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'

const WorkoutGraphs = (exercises) => {
    
  const [exerciseForGraph, setSelectedExercise] = useState('')
  const userData = useSelector(state => state.user);

  const exerciseData = new Array()

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
        data={exerciseData}
      >

        <View style={{flex: 1}}>
          <Text>
            {/* configure gaph */}
            {exerciseForGraph} is selected for graph
          </Text>
        </View>

      </DropdownMenu>
    </View>
  );
}

export default WorkoutGraphs;