import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import Constants from 'expo-constants';
import Donut from '../navigation/Donut'
import {useSelector, useDispatch} from 'react-redux'

import {Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable, Alert, Image} from "react-native";
import { useTheme } from '@react-navigation/native';

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';


const Home = ({navigation})  => {
    //e();

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
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
        alignSelf: 'center',
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        paddingVertical: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: theme.colors.text
      },
      inputView:{
        flexDirection: 'row',
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        marginHorizontal: 50,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: theme.colors.secondary
    },
    brock_button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      height: 40,
      margin: 10,
      marginLeft: 0,
      justifyContent: "center",
      paddingHorizontal: 20
  },
    })

    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGroupName, setGroupName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [streak, setStreak] = useState(0);

    let friends = [];
    let friends2 = [];


   
    var data = qs.stringify({
      'username': userData.username.username,
      'groupName': userData.username.groupName 
    });
    var config2 = {
      method: 'get',
      url: 'http://' + config.ipv4 + ':5000/user/listGroupMembers',
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

              if (biggerDog[i].username == userData.username.username) {
                continue;
              }
              //console.log(friend);
              friends2.push(friend);
              //setFriendsList(friendsList.concat(friend));
              //setFriendsList(friendsList.concat(biggerDog[i].username));
            }
            //console.log("Teter", friends2)
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          })
        }

        getFriendsList();
        setFriendsList(friends2);
        // hi lol xdDD easter egg :D
        ///asdfasdf
        //console.log(friends2);
    },[newGroupName])

    const joinGroup = () => {
       //console.log(newGroupName);
        var data = qs.stringify({
          'username': userData.username.username,
          'groupName': newGroupName 
        });
        var config3 = {
          method: 'post',
          url: 'http://' + config.ipv4 + ':5000/user/joinGroup',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };

      axios(config3)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        //console.log(userData.username)
        
        let data = userData.username;
        data.groupName = newGroupName;
        dispatch(updateUsername(data))
        //console.log("group name:" + userData.username.groupName);
        setGroupName(userData.username.groupName);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const CheckInFunction = () => {
      var data = qs.stringify({
        'username': userData.username.username 
      });
      var config2 = {
        method: 'post',
        url: 'http://' + config.ipv4 + ':5000/user/checkIn',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios(config2)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.data.checkIn) {
          Alert.alert("Successfully worked out today!")
          let data = userData.username;
          //console.log('Pre Yarpins')
          data.streakCounter = userData.username.streakCounter += 1;
          dispatch(updateUsername(data));
          setStreak(userData.username.streakCounter);
          //console.log("Yarpins", userData.username)
          //setGroupName(userData.username.groupName);
        }
        else {
          Alert.alert("Already checked in for the day.")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }


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
                  backgroundColor: theme.colors.secondary,
                  borderRadius: 15,
                  padding: 15,
                  width: "95%",
                  height: "95%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: 100,
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: "bold", color: theme.colors.text}}>{friendsList[i].Username}</Text>
                  <Text style={{color: theme.colors.text}}>{"Streak: " + friendsList[i].Streak}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                <Image
                                      source={require('../assets/home.png')}
                                      resizeMode='contain'
                                      style={{
                                          width: 25,
                                          height: 25,
                                          tintColor: '#748c94',
                                          marginLeft: 150,                       
                                      }}
                    />
                </View>
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
        color: 'forestgreen',
        max: 400,
        calorie: false,
        dataLabel: "carb"
      }];

      let streakImageURL = "";
      let streakDayCounter = userData.username.streakCounter;

      switch(true){
        case 5 <= streakDayCounter < 10:
          streakImageURL = require("../assets/badge2.png");
        case 10 <= streakDayCounter < 25:
          streakImageURL = require("../assets/badge3.png");
        case 25 <= streakDayCounter < 50:
          streakImageURL = require("../assets/badge4.png");
        case 50 <= streakDayCounter < 75:
          streakImageURL = require("../assets/badge5.png");
        case 75 <= streakDayCounter < 100:
          streakImageURL = require("../assets/badge6.png");
        case streakDayCounter > 100:
          streakImageURL = require("../assets/badge7.png");
        default:
          streakImageURL = require("../assets/badge1.png");
      }

      // if(userData.username.streakCounter < 5){
      //   streakImageURL = require("../assets/badge1.png");
      // }
      // else{
      //   streakImageURL = require("../assets/pasta.png");
      // }

      //console.timeEnd();
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
                {flex: 1},
              ]}
            >
              <Text style={styles.title}>Workout Streak: {userData.username.streakCounter} 🔥</Text>
              <Image
                source={streakImageURL}
                resizeMode='contain'
                style={{
                    flex: 1,
                    width: '100%',
                }}
              />
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
                                    joinGroup();
                                    setGroupName('');
                                }}
                                style={styles.brock_button}
                            >
                                <Text>🔎</Text>
                            </TouchableOpacity>
                        </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Return</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={[
                styles.btn_shape,
                { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.btn_text}>Join or Create Group</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => CheckInFunction()}
              style={[
                styles.btn_shape,
                { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
              ]}
            >
              <Text style={styles.btn_text}>Check In</Text>
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