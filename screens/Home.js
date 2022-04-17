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
import ProgressBar from "react-native-animated-progress";



const Home = ({ navigation }) => {

  const userData = useSelector(state => state.user);

  const updateStartingWeight = () => {
    let startingWeight = 0;
    if (userData.username.weightList.length != 0) {
        startingWeight = userData.username.weightList[userData.username.weightList.length - 1].weight;
    }
    var data = qs.stringify({
      'username': userData.username.username,
      'goalWeight': userData.username.goalWeight,
      'startingWeight': startingWeight,
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
        //data.goalWeight = goalWeight;
        data.startingWeight = startingWeight;
        dispatch(updateUsername(data));
        //setGoalWeight(userData.username.goalWeight);
        //.username.goalWeight);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let displayString = "";
  let startingWeight = 0;
  let currentWeight2 = 0;
  let goalWeight2 = 0;
  let initialDiffernce = 0;
  let currentDifference = 0;
  let initialDaysLeft = 0;
  let proportion = -1;
  let daysLeft = 0;
  let exceeded = false;
  if (userData.username.weightList.length == 0) {
        displayString = "⚠️ Please log current weight and set goal weight";
  }
  else {
        startingWeight = userData.username.startingWeight;
        currentWeight2 = userData.username.weightList[userData.username.weightList.length - 1].weight;
        goalWeight2 = userData.username.goalWeight;
        initialDiffernce = goalWeight - startingWeight;
        initialDaysLeft = Math.abs(Math.round(((goalWeight2 - startingWeight) / 0.8) * 7));

        //bulking or cutting
        if (currentWeight2 != goalWeight2) { 
            currentDifference = Math.abs(goalWeight2 - currentWeight2);
            daysLeft = Math.abs(Math.round(((goalWeight2 - currentWeight2) / 0.8) * 7));

            //if you are originally cutting and go below goal weight
            if (currentWeight2 < goalWeight2 && startingWeight > goalWeight2) {
                // startingWeight = currentWeight;
                // updateStartingWeight();
                // initialDaysLeft = daysLeft;
                exceeded = true;


            }
            //if you are originally bulking and go above goal weight 
            else if (currentWeight2 > goalWeight2 && startingWeight < goalWeight2) {
                // startingWeight = currentWeight;
                // updateStartingWeight();
                // initialDaysLeft = daysLeft;
                exceeded = true;
            }
              //if you get to a worse off position from your starting weight
            else if (daysLeft > initialDaysLeft) {
                startingWeight = currentWeight2;
                updateStartingWeight();
                initialDaysLeft = daysLeft;
            }
            proportion = (1 - daysLeft/initialDaysLeft) * 100;
            if (proportion < 0) {
                proportion = 0;
            }
            if (exceeded) {
                proportion = 100;
            }
            

        }
        
        //reached goal/recomp
        else {
            //startingWeight = goalWeight;
            daysLeft = 0;
            proportion = 100;
            
        }
        
        if (proportion != 100) {
            if (daysLeft != 1) {
                displayString = String(daysLeft) + " more days!";
            }
            else {
                displayString = String(daysLeft) + " more day!"
            }
        }
        else if (exceeded) {
            displayString = "Surpassed your goal‼️";
            Alert.alert("Congratulations on reaching and exceeding your goal! Please update your goal weight to continue making progress.")
        }
        else {
            displayString = "Goal Weight! ✅ ";
            Alert.alert("Congratulations on reaching goal! Please update your goal weight to continue making progress.")
        }
  }
  console.log(proportion);
  //e();

  
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
    title_box2: {
      backgroundColor: "rgba(74,144,226,1)",
      borderRadius: 10,
      width: 30,
      height: 40,
      justifyContent: "center",
    },
    title: {
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: "bold",
      alignSelf: "center",
    },
    title2: {
      color: theme.colors.text,
      fontSize: 18,
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
    modalView2: {
      margin: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal:10,
      //padding: 20,
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
    buttonRyan: {
      borderRadius: 20,
      padding: 10,
      marginTop: 15,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: theme.colors.text,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
      color: theme.colors.text
    },
    modalText2: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 25,
      color: theme.colors.text,
      fontWeight: 'bold'
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
  const [wilkModal, setWilkModal] = useState(false);
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
              "WilksScore": biggerDog[i].wilksScore,
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
    let startingWeight = 0;
    if (userData.username.weightList.length != 0) {
        startingWeight = userData.username.weightList[userData.username.weightList.length - 1].weight;
    }
    var data = qs.stringify({
      'username': userData.username.username,
      'goalWeight': goalWeight,
      'startingWeight': startingWeight,
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
        data.startingWeight = startingWeight;
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

  const wilkslevel = (score) => {
    let level = "";
    if (score >= 414) {
        level = "Elite";
    }
    else if (score >= 326) {
        level = "Advanced";
    }
    else if (score >= 238) {
        level = "Intermediate";
    }
    else if (score >= 200) {
        level = "Novice";
    }
    else {
        level = "Untrained";;
    }
    return level;
  }

  for (var i = 0; i < friendsList.length; i++) {
    friends.push(
      <View
        key={i}
        style={{
          alignItems: "center",
          width: 370,
          height: 110,
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
            <Text style={{ color: theme.colors.text , marginVertical: 2}}>{"Streak: " + friendsList[i].Streak + "🔥"}</Text>
            <Text style={{ color: theme.colors.text }}>{"Wilks Score: " + friendsList[i].WilksScore}</Text>
            <Text style={{ color: theme.colors.text }}>{wilkslevel(friendsList[i].WilksScore)}</Text>
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
              {currentWeight == oldWeight ? (currentWeight + " lbs ✏️") : 
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
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setWilkModal(true)}
          style={[
            styles.title_box2,
            { backgroundColor: theme.colors.third, marginVertical: 10, alignSelf: 'left'},
            { flex: 1 }, {marginRight: 20, marginLeft: 10},
          ]}
        >
          <Text style={styles.title2}>Wilks: {userData.username.wilksScore}</Text>
          {/* <Image
                source={streakImageURL}
                resizeMode='contain'
                style={{
                    flex: 1,
                    width: '100%',
                }}
              /> */}
        </TouchableOpacity>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={wilkModal}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setWilkModal(false);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView2}>
                      <Text style={styles.modalText2}>What is a Wilks Score?</Text>
                      <Text style={styles.modalText}>The Wilks Score measures your strength in powerlifting against other powerlifters with different bodyweights.</Text>
                      <Text style={styles.modalText}>The lift requires data from your squat, bench, and deadlift, so please add those exercises
                      to properly see your Wilks Score.</Text>
                      
                      <Text style={styles.modalText}>Untrained: 120</Text>
                      <Text style={styles.modalText}>Novice: 200</Text>
                      <Text style={styles.modalText}>Intermediate: 238</Text>
                      <Text style={styles.modalText}>Advanced: 326</Text>
                      <Text style={styles.modalText}>Elite: 414</Text>
                      
                      
                      <TouchableOpacity
                        style={[styles.buttonRyan, styles.buttonClose]}
                        onPress={() => setWilkModal(false)}
                      >
                        <Text style={styles.textStyle}>Return</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
        <View
          style={[
            styles.title_box2,
            { backgroundColor: theme.colors.third, marginVertical: 10, alignSelf: 'right', marginRight: 10 },
            { flex: 1 },
          ]}
        >
          <Text style={styles.title2}>Streak: {userData.username.streakCounter} 🔥</Text>
          {/* <Image
                source={streakImageURL}
                resizeMode='contain'
                style={{
                    flex: 1,
                    width: '100%',
                }}
              /> */}
        </View>
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
                style={[
                  styles.button, styles.buttonClose,
                  
                ]}
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
      <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'space-evenly',
                                    paddingHorizontal: 16,
                                    bottom: 20
                                }}>
                                
                                <View>
                                    <Text style={{ marginBottom:  0, opacity: 0}}>
                                    Progress with animation and increased heighthhhhhhhh
                                    </Text>
                                    <View stlye={{flexDirection:'row'}}>
                                        {proportion == -1 ? <Text></Text> : <Text style={{color: theme.colors.text, textAlign: 'left', top: 24, fontSize: 20}}>{startingWeight} lbs</Text>}
                                        {/* {proportion == -1 ? <Text></Text> : <Text style={{color: theme.colors.text, textAlign: 'center', top: 0, fontSize: 15}}>{proportion.toFixed(2)} %</Text>} */}
                                        {proportion == -1 ? <Text></Text> : <Text style={{color: theme.colors.text, textAlign: 'right', fontSize: 20}}>{goalWeight2} lbs 🏆</Text>}
                                        {proportion == -1 ? <Text></Text> : <ProgressBar progress={proportion + 1} height={15} backgroundColor="#00ffff" trackColor={theme.colors.card} />}
                                        {proportion == -1 ? <Text></Text> : <Text style={{color: 'grey', textAlign: 'center', bottom: 16, fontSize: 15}}>{currentWeight2} lbs</Text>}
                                        
                                    </View>
                                    <View >
                                        
                                        {proportion == -1 ? <Text style={{color: theme.colors.text, textAlign: 'center', marginTop: -10, fontSize: 15, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}>{displayString}</Text>  
                                                         : <Text style={{color: theme.colors.text, textAlign: 'center', marginTop: -10, fontSize: 25, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}>{displayString}</Text> }
                                        
                                    </View>
                                    
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