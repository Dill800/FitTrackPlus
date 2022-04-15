import * as React from "react";
import { useRef, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import Donut from '../navigation/Donut'
import { useSelector, useDispatch } from 'react-redux'

import { Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable, Alert, Image } from "react-native";
import { useTheme } from '@react-navigation/native';

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';



const Home = ({ navigation }) => {
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
      fontWeight: "bold",
      alignSelf: "center",
    },
    progress_container: {
      flexDirection: "row",
      width: "100%",
      marginTop: 20,
      justifyContent: "center",
    },
    progress_box: {
      backgroundColor: theme.colors.secondary,
      width: "30%",
      height: 60,
      borderRadius: 10,
      marginHorizontal: 5,

    },
    progress_boxBadge: {
      width: "20%",
      height: 60,
      borderRadius: 10,
      marginHorizontal: 5,

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
      color: theme.colors.text,
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
    inputView: {
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
      backgroundColor: theme.colors.secondary,
      color: theme.colors.text,
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
  const [goalModal, setGoalModal] = useState(false);
  const [wodalVisible, setWodalVisible] = useState(false);
  const [goalWeight, setGoalWeight] = useState(0);
  const [currWeight, setCurrWeight] = useState(0);
  const [streak, setStreak] = useState(0);
  //const [currentWeight, setCurrentWeight] = useState(0);

  let friends = [];
  let friends2 = [];

  let friendStreakURL = (streakNumber) => {
    switch (true) {
      case streakNumber < 5:
        return require("../assets/badge1.png");
        break;
      case streakNumber < 10:
        return require("../assets/badge2.png");
        break;
      case streakNumber < 25:
        return require("../assets/badge3.png");
        break;
      case streakNumber < 50:
        return require("../assets/badge4.png");
        break;
      case streakNumber < 75:
        return require("../assets/badge5.png");
        break;
      case streakNumber < 100:
        return require("../assets/badge6.png");
        break;
      default:
        return require("../assets/badge7.png");
        break;
    }
  }



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

  const [getName, setName] = useState(userData.username.username);

  useEffect(() => {
    async function getFriendsList() {
      axios(config2)
        .then(function (response) {
          let upperName = getName;
          upperName = upperName.charAt(0).toUpperCase() + upperName.slice(1);
          console.log(upperName);
          setName(upperName);
          //console.log(JSON.stringify(response.data.data));
          let bigDog = JSON.stringify(response.data.data);
          let biggerDog = (JSON.parse(bigDog));
          for (var i = 0; i < biggerDog.length; i++) {
            var friend = {
              "Username": biggerDog[i].username,
              "Streak": biggerDog[i].streakCounter,
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
  }, [newGroupName])

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
      data: data
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

  const updateGoalWeight = () => {
    var data = qs.stringify({
      'username': userData.username.username,
      'goalWeight': goalWeight,
    });
    var config2 = {
      method: 'post',
      url: 'http://' + config.ipv4 + ':5000/user/updateGoalWeight',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios(config2)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let data = userData.username;
        data.goalWeight = goalWeight;
        dispatch(updateUsername(data));
        setGoalWeight(userData.username.goalWeight);
        //.username.goalWeight);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateCurrWeight = () => {

    navigation.navigate("Macros")
    return;
    var data = qs.stringify({
      'username': userData.username.username,
      'weight': currWeight,
    });
    var config2 = {
      method: 'post',
      url: 'http://' + config.ipv4 + ':5000/user/addWeight',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios(config2)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let data = userData.username;
        data.weightList.push({
          'weight': currWeight,
          'date': new Date()
        })
        dispatch(updateUsername(data));
        //.username.goalWeight);

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
      data: data
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
        key={i}
        style={{
          alignItems: "center",
          width: 370,
          height: 100,
          paddingTop: 8,
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
              width: 150,
              justifyContent: 'center',
              padding: 10,
              //backgroundColor: theme.colors.secondary,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: theme.colors.text, width: 1000}}>{friendsList[i].Username}</Text>
            <Text style={{ color: theme.colors.text }}>{"Streak: " + friendsList[i].Streak + "🔥"}</Text>
          </View>
          <View style={{ justifyContent: 'center', width: 50,}}>
            <Image
              source={friendStreakURL(friendsList[i].Streak)}
              resizeMode='contain'
              style={{
                flex: 1,
                width: '100%',
                height: 25,
                marginLeft: 100,
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  let sumCals = () => {
    let x = 0;
    for(let i = 0; i < userData.username.mealList.length; i++) {
        let date = new Date(userData.username.mealList[i].date)
        let today = new Date()
        //console.log(today.getDate(), today.getMonth(), today.getFullYear())
        //console.log(date.getDate(), date.getMonth(), date.getFullYear())
        let meal = userData.username.mealList[i];
        if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            x = x + parseInt(meal.calories);
        }
    }
    return x;
  }
  //sumCals()

  let sumProt = () => {
      let x = 0;
      for(let i = 0; i < userData.username.mealList.length; i++) {
          let date = new Date(userData.username.mealList[i].date)
          let today = new Date()
          //console.log(today.getDate(), today.getMonth(), today.getFullYear())
          //console.log(date.getDate(), date.getMonth(), date.getFullYear())
          let meal = userData.username.mealList[i];
          if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
              x = x + parseInt(meal.protein);
          }
      }
      return x;
  }
  //sumProt()

  let sumFat = () => {
      let x = 0;
      for(let i = 0; i < userData.username.mealList.length; i++) {
          let date = new Date(userData.username.mealList[i].date)
          let today = new Date()
          let meal = userData.username.mealList[i];
          if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
              x = x + parseInt(meal.fat);
          }
      }
      return x;
  }
  //sumFat()

  let sumCarbs = () => {
      let x = 0;
      for(let i = 0; i < userData.username.mealList.length; i++) {
          let date = new Date(userData.username.mealList[i].date)
          let today = new Date()
          let meal = userData.username.mealList[i];
          if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
              x = x + parseInt(meal.carbs);
          }
      }
      return x;
  }

  const donutData = [{
    percentage: sumCals(),
    color: 'tomato',
    max: 2400,
    calorie: true,
    dataLabel: "calorie"
  }, {
    percentage: sumFat(),
    color: 'skyblue',
    max: 92,
    calorie: false,
    dataLabel: "fat"
  }, {
    percentage: sumProt(),
    color: 'gold',
    max: 150,
    calorie: false,
    dataLabel: "protein"
  }, {
    percentage: sumCarbs(),
    color: 'forestgreen',
    max: 400,
    calorie: false,
    dataLabel: "carb"
  }];

  let streakImageURL = "";
  let streakDayCounter = userData.username.streakCounter;

  switch (true) {
    case streakDayCounter < 5:
      streakImageURL = require("../assets/badge1.png");
      break;
    case streakDayCounter < 10:
      streakImageURL = require("../assets/badge2.png");
      break;
    case streakDayCounter < 25:
      streakImageURL = require("../assets/badge3.png");
      break;
    case streakDayCounter < 50:
      streakImageURL = require("../assets/badge4.png");
      break;
    case streakDayCounter < 75:
      streakImageURL = require("../assets/badge5.png");
      break;
    case streakDayCounter < 100:
      streakImageURL = require("../assets/badge6.png");
      break;
    default:
      streakImageURL = require("../assets/badge7.png");
      break;
  }

  // if(userData.username.streakCounter < 5){
  //   streakImageURL = require("../assets/badge1.png");
  // }
  // else{
  //   streakImageURL = require("../assets/pasta.png");
  // }

  let currentWeight = 0;
  let oldWeight = 0;
  if (userData.username.weightList.length != 0) {
    //userData.username.weightList[userData.username.weightList.length - 1];
    //setCurrentWeight(userData.username.weightList[userData.username.weightList.length - 1]);
    console.log("hi");
    currentWeight = userData.username.weightList[userData.username.weightList.length - 1].weight;
    if (userData.username.weightList.length > 1) {
      oldWeight = userData.username.weightList[userData.username.weightList.length - 2].weight;
    }
  }

  //sumCarbs()
  //console.timeEnd();
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.progress}>
        <View style={styles.title_box}>
          <Text style={styles.title}>Hi, {getName}! 👋</Text>
        </View>
        <View style={styles.progress_container}>
          <TouchableOpacity style={styles.progress_box} onPress={() => navigation.navigate("Weight Log")}>
            <Text style={styles.progress_title}>Current Weight:</Text>
            <Text style={styles.progress_value}>
              {currentWeight == oldWeight ? (currentWeight + " lbs") : 
                (currentWeight < oldWeight ? (currentWeight + " lbs 🔽") : currentWeight + " lbs 🔼")}
            </Text>
          </TouchableOpacity>





          {/* update current weight by adding to weightList */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={wodalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setWodalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Update Current Weight</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Submit'
                    placeholderTextColor='grey'
                    onChangeText={e => setCurrWeight(e)}
                    value={currWeight+""}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      //console.log("hit");
                      updateCurrWeight();
                      setCurrWeight('');
                    }}
                    style={styles.brock_button}
                  >
                    <Text>☑️</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setWodalVisible(false)}
                >
                  <Text style={styles.textStyle}>Return</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>






          <Modal
            animationType="slide"
            transparent={true}
            visible={goalModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setGoalModal(!goalModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Update Goal Weight</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Submit'
                    placeholderTextColor='grey'
                    onChangeText={e => setGoalWeight(e)}
                    value={goalWeight}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      //console.log("hit");
                      updateGoalWeight();
                      setGoalWeight('');
                      setGoalModal(!goalModal);
                    }}
                    style={styles.brock_button}
                  >
                    <Text>☑️</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setGoalModal(!goalModal)}
                >
                  <Text style={styles.textStyle}>Return</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.progress_boxBadge}>
            <Image
              source={streakImageURL}
              resizeMode='contain'
              style={{
                flex: 1,
                width: '100%',
              }}
            />

          </View>
          <TouchableOpacity style={styles.progress_box} onPress={() => setGoalModal(true)}>
            <Text style={styles.progress_title}>Goal Weight</Text>
            <Text style={styles.progress_value}>
              {userData.username.goalWeight + " lbs ✏️"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.exercise_container}>
        <View
          style={[
            styles.title_box,
            { backgroundColor: theme.colors.third, marginVertical: 10 },
            { flex: 1 },
          ]}
        >
          <Text style={styles.title}>Workout Streak: {userData.username.streakCounter} 🔥</Text>
          {/* <Image
                source={streakImageURL}
                resizeMode='contain'
                style={{
                    flex: 1,
                    width: '100%',
                }}
              /> */}
        </View>
        <ScrollView horizontal={false} style={styles.box}>
          <View style={{flexGrow: 0}}>{friends}</View>
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
            { backgroundColor: theme.colors.third, marginHorizontal: 10 },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btn_text}>Join or Create Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CheckInFunction()}
          style={[
            styles.btn_shape,
            { backgroundColor: theme.colors.third, marginHorizontal: 10 },
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
        <StatusBar hidden />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center', top: 10 }}>
          {donutData.map((p, i) => {
            return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} calorie={p.calorie} dataLabel={p.dataLabel} />
          })}
        </View>
      </View>
    </View>
    </ScrollView>
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