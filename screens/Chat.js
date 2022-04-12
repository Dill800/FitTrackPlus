import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import Constants from 'expo-constants';
import Donut from '../navigation/Donut'
import {useSelector, useDispatch} from 'react-redux'

import {Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable} from "react-native";
import { useTheme } from '@react-navigation/native';

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';


const Chat = ({navigation})  => {
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
        fontSize: 20
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
        backgroundColor: "#f0f8ff"
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

    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGroupName, setGroupName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    let chats = [];
    let chats2 = [];


   
    var data = qs.stringify({
      'username': userData.username.username,
      'groupName': userData.username.groupName 
    });
    var config2 = {
      method: 'get',
      url: 'http://' + config.ipv4 + ':5000/chat/getPosts',
    };

      useEffect(() => {
        async function getChatsList() {
          axios(config2)
          .then(function (response) {
            //console.log(JSON.stringify(response.data.data));
            console.log('Yarp', response.data)
            let bigDog = JSON.stringify(response.data);
            let biggerDog = (JSON.parse(bigDog));
            for (var i = 0; i < biggerDog.length; i++) {
              var chat  = {
                "title" : biggerDog[i].title,
                "body" : biggerDog[i].body,
                "username" : biggerDog[i].username,
                "comments" : biggerDog[i].comments,
                "date" : biggerDog[i].createdAt,
                "groupName" : biggerDog[i].groupName
              };

              
            //console.log(friend);
            chats2.push(chat);
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          })
        }

        getChatsList();
        setChatList(chats2);

    },[newGroupName])

    const joinGroup = () => {
        console.log(newGroupName);
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
        console.log(userData.username)
        
        let data = userData.username;
        data.groupName = newGroupName;
        dispatch(updateUsername(data))
        console.log("group name:" + userData.username.groupName);
        setGroupName(userData.username.groupName);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    for (var i = 0; i < chatList.length; i++) {
        console.log(chatList[i].groupNamer)
        if(chatList[i].groupName === userData.username.groupName)
      chats.push(
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
                }}
              >
                <Text style={{ fontSize: 25, fontWeight: "bold", color: theme.colors.text}}>{chatList[i].title}</Text>
                <Text style={{color: theme.colors.text}}>{chatList[i].body}</Text>
              </View>
            </View>
      )
    }



      return (
        <View style={styles.container}>
          <View style={styles.exercise_container}>
            <View
              style={[
                styles.title_box,
                { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10 },
              ]}
            >
            </View>
            <ScrollView horizontal={false} style={styles.box}>
              <Text>{chats}</Text>
            </ScrollView>
          </View>
        </View>
      );
  }

    

export default Chat;