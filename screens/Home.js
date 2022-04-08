import * as React from "react";
import Constants from 'expo-constants';
import Donut from '../navigation/Donut'
import {useSelector, useDispatch} from 'react-redux'

import {ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar} from "react-native";

const Home = ({navigation}) => {

    const userData = useSelector(state => state.user)

    let exercise = [];
    let activityTotal = 0.0;
    const activities = [];
    const widthAndHeight = 250
    const series = [123, 321, 90]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B']
    let friends = [];
    friends.push(<View
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Dillon</Text>
          <Text>{"Streak: 103"}</Text>
          <Text>{"Wilk's Score: 386"}</Text>
        </View>
      </View>)
      friends.push(<View
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Brock</Text>
          <Text>{"Streak: 103"}</Text>
          <Text>{"Wilk's Score: 386"}</Text>
        </View>
      </View>)
      friends.push(<View
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>David</Text>
          <Text>{"Streak: 103"}</Text>
          <Text>{"Wilk's Score: 386"}</Text>
        </View>
      </View>)
      friends.push(<View
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Gary</Text>
          <Text>{"Streak: 103"}</Text>
          <Text>{"Wilk's Score: 386"}</Text>
        </View>
      </View>)
      friends.push(<View
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ryan</Text>
          <Text>{"Streak: 103"}</Text>
          <Text>{"Wilk's Score: 386"}</Text>
        </View>
      </View>)

    activities.forEach((x) => {
      exercise.push(
        <View
          key={x.id}
          style={{
            alignItems: "center",
            width: 370,
            height: 100,
            paddingTop: 8,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(230,230,230,1)",
              borderRadius: 15,
              padding: 15,
              width: "95%",
              height: "95%",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{x.name}</Text>
            <Text>{"Duration: " + x.duration + " min"}</Text>
            <Text>{"Calories: " + x.calories + " cal"}</Text>
          </View>
        </View>
      );
      activityTotal = activityTotal + x.duration;
    });
    const donutData = [{
        percentage: 1700,
        color: 'tomato',
        max: 2400,
        calorie: true,
        dataLabel: "calorie"
      }, {
        percentage: 76,
        color: 'skyblue',
        max: 92,
        calorie: false,
        dataLabel: "fat"
      }, {
        percentage: 130,
        color: 'gold',
        max: 150,
        calorie: false,
        dataLabel: "protein"
      }, {
        percentage: 200,
        color: '#222',
        max: 400,
        calorie: false,
        dataLabel: "carb"
      }];

      return (
        <View style={styles.container}>
          <View style={styles.progress}>
            <View style={styles.title_box}>
              <Text style={styles.title}>Hi, {userData.username.username}! 👋</Text>
            </View>
            <View style={styles.progress_container}>
              <View style={styles.progress_box}>
                <Text style={styles.progress_title}>Current Weight:</Text>
                <Text style={styles.progress_value}>
                  {"155 lbs 🔼"}
                </Text>
              </View>
              <View style={styles.progress_box}>
                <Text style={styles.progress_title}>Goal Weight</Text>
                <Text style={styles.progress_value}>
                  {"160 lbs 🥅"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.exercise_container}>
            <View
              style={[
                styles.title_box,
                { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10 },
              ]}
            >
              <Text style={styles.title}>Workout Streak: 125 🔥</Text>
            </View>
            <ScrollView horizontal={false} style={styles.box}>
              <Text>{friends}</Text>
            </ScrollView>
          </View>
          <View style={styles.btn_box}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Exercise", {
                  username: this.props.navigation.state.params.username,
                  token: this.props.navigation.state.params.token,
                });
              }}
              style={[styles.btn_shape, { marginHorizontal: 10 }]}
            >
              <Text style={styles.btn_text}>Add Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.refresh()}
              style={[
                styles.btn_shape,
                { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
              ]}
            >
              <Text style={styles.btn_text}>Refresh</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                username: this.props.navigation.state.params.username,
                token: this.props.navigation.state.params.token,
              })
            }
            style={[styles.btn_shape, { backgroundColor: "rgba(74,144,226,1)" }]}
          >
            <Text style={styles.btn_text}>View Profile</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={[styles.btn_shape, { backgroundColor: "red" }]}
          >
            <Text style={styles.btn_text}>Log Out</Text>
          </TouchableOpacity> */}
          <View style={styles.container}>
              <StatusBar hidden/>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center', top: 10}}>
                  {donutData.map((p, i) => {
                  return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} calorie={p.calorie} dataLabel={p.dataLabel}/>
                  })}
              </View>
          </View>
        </View>
      );
  }
  


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
      height: 400,
      alignItems: "center",
    },
    box: {
      backgroundColor: "rgba(213,218,223,1)",
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

    

export default Home;
// import React, {useState, useEffect} from 'react';
// import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button} from 'react-native';

// const Home = ({navigation}) => {

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <Text>Home Screen</Text>
//         </View>
//       );

// }

// const styles = StyleSheet.create({
//     formView:{
//         flex: 1.5,
//         backgroundColor: '#f0f8ff',
//         bottom: 50,
//         borderTopStartRadius: 60,
//         borderTopEndRadius: 60,
//         alignItems: "center"
//     },
//     inputView:{
//         backgroundColor: "#71ebeb",
//         borderRadius: 30,
//         width: "70%",
//         height: 45,
//         marginBottom: 20,
//         alignItems: "center",
//         justifyContent: "center"
//     }
// })

// export default Home;