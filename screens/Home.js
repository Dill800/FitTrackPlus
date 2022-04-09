import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import Constants from 'expo-constants';
import Donut from '../navigation/Donut'
import {useSelector, useDispatch} from 'react-redux'

import {useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar} from "react-native";
import { useTheme } from '@react-navigation/native';


import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'

const Home = ({navigation})  => {

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
      color: theme.colors.text,
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
      backgroundColor: theme.colors.card,
      width: "40%",
      height: 55,
      borderRadius: 10,
      marginHorizontal: 25,
    },
    progress_title: {
      color: theme.colors.text,
      alignSelf: "center",
      marginVertical: 4,
    },
    progress_value: {
      color: theme.colors.text,
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
    const userData = useSelector(state => state.user)

    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGroupName, setGroupName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    let friends = [];
    let friends2 = [];


   
    var data = qs.stringify({
      'username': userData.username.username,
      'groupName': userData.username.groupName 
    });
    var config2 = {
      method: 'get',
      url: 'http://' + config.ipv4+ ':5000/user/listGroupMembers?username=bid&groupName=Fellow',
      params: {
        username: userData.username.username,
        groupName: userData.username.groupName
    }
    };


   
    useEffect(() => {
        async function getFriendsList() {
          axios(config2)
          .then(function (response) {
            //console.log(JSON.stringify(response.data.data));
            let bigDog = JSON.stringify(response.data.data);
            let biggerDog = (JSON.parse(bigDog));
            for (var i = 0; i < biggerDog.length; i++) {
              var friend  = {
                "Username" : biggerDog[i].username,
                "Streak" : biggerDog[i].streakCounter,
              };
  
              
            //console.log(friend);
            friends2.push(friend);
            //setFriendsList(friendsList.concat(friend));
            //setFriendsList(friendsList.concat(biggerDog[i].username));
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          })
        }

        getFriendsList();
        setFriendsList(friends2);
        console.log(friends2);
    },[])

  
    let exercise = [];
    let activityTotal = 0.0;
    const activities = [];
    const widthAndHeight = 250
    const series = [123, 321, 90]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B']

    for (var i = 0; i < friendsList.length; i++) {
      friends.push(
            <View
              key= {i}
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
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{friendsList[i].Username}</Text>
                <Text>{"Streak: " + friendsList[i].Streak}</Text>
              </View>
            </View>
      )
    }


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
              <Text style={styles.title}>Workout Streak: {userData.username.streakCounter} 🔥</Text>
            </View>
            <ScrollView horizontal={false} style={styles.box}>
              <Text>{friends}</Text>
            </ScrollView>
          </View>
          <View style={styles.btn_box}>
            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Exercise", {
                  username: this.props.navigation.state.params.username,
                  token: this.props.navigation.state.params.token,
                });
              }}
              style={[styles.btn_shape, { marginHorizontal: 10 }]}
            >
              <Text style={styles.btn_text}>Join Group</Text>
            </TouchableOpacity> */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Enter a group name</Text>
                  <View style={styles.inputView}>
                            <TextInput
                                style={styles.input}
                                placeholder='Submit'
                                placeholderTextColor='grey'
                                onChangeText={e => setGroupName(e)}
                                value={newGroupName}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setGroupName('');
                                }}
                                style={styles.brock_button}
                            >
                                <Text>🔎</Text>
                            </TouchableOpacity>
                        </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[
                styles.btn_shape,
                { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.btn_text}>Show Modal</Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => this.refresh()}
              style={[
                styles.btn_shape,
                { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
              ]}
            >
              <Text style={styles.btn_text}>Create Group</Text>
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