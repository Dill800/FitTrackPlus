import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import {Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable} from "react-native";
import { useTheme } from '@react-navigation/native';

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';

import {ChatText} from '../components/chatText'

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
        marginTop: 15,
        marginBottom: 15,
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
        height: "75%",
        alignItems: "center",
      },
      box: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        width: "95%",
        height: 400,
        padding: '5%',
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
        marginTop: 40,
        marginBottom: 40,
      },
      modalView: {
        margin: 20,
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        paddingVertical: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '95%'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
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
        color: theme.colors.text,
        marginHorizontal: 100
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
        backgroundColor: "#f0f8ff",
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
    comment_input: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%'
    }
    })

    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGroupName, setGroupName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [comment, setComment] = useState();

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
                console.log(biggerDog[i])
              var chat  = {
                "id" : biggerDog[i]._id,
                "title" : biggerDog[i].title,
                "body" : biggerDog[i].body,
                "username" : biggerDog[i].username,
                "comments" : biggerDog[i].comments,
                "date" : biggerDog[i].createdAt,
                "groupName" : biggerDog[i].groupName
              };

              
            //console.log(friend);
            console.log("Chat, ", chat)
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

    },[])

    
    for (var i = 0; i < chatList.length; i++) {
        console.log(chatList[i].groupName)
        if(chatList[i].groupName === userData.username.groupName)
      chats.push(
            <ChatText setModalInfo={setModalInfo} setModalVisible={setModalVisible} key={i} i={i} body={chatList[i].body} title={chatList[i].title} username={chatList[i].username} comments={chatList[i].comments} id={chatList[i].id}/>
      )
    }

    const getComments = () => {

        let x = [];

        console.log("Looking for comments. Size: ", modalInfo.comments.length)

        for(var i = 0; i < modalInfo.comments.length; i++) {
            console.log(modalInfo.comments[i])
            x.push(
                <View
                style={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: 15,
                    padding: 15,
                    width: 315 ,
                    marginHorizontal: 10,
                    alignSelf: 'flex-start',
                    marginBottom: 10
                }}
                key={i}
                >
                    <Text style={{color: theme.colors.text}}>{modalInfo.comments[i].username}: {modalInfo.comments[i].comment}</Text>
                </View>
            )

            
        }

        return x;

    }

    const uploadComment = () => {

        // take in what is in modal info
        // update add in comments
        let newData = modalInfo
        newData.comments.push({
            "comment": comment,
            "date": Date.now(),
            "username": userData.username.username
        })
        console.log("newData:", newData)

        // hit endpoint to add comment based on chatpost id
        // modalInfo.id
        axios.post('http://' + config.ipv4 + ':5000/chat/newComment', {
            id: modalInfo.id,
            commentData: {
                comment: comment,
                username: userData.username.username,
                date: Date.now()
            }
        })
        .then(res => {
            console.log("res", res)
        })
        .catch(e => {
            console.log("error", e)
        })

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
                <Text style={styles.title}>{userData.username.groupName}'s Chatroom 💬</Text>
            </View>
            <ScrollView horizontal={false} style={styles.box}>
              <Text>{chats}</Text>
            </ScrollView>
          </View>
          <View style={styles.btn_box}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Comments:</Text>
                <View style={styles.comment_input}>
                  <TextInput
                      style={styles.input}
                      placeholder='Write Comment Here'
                      placeholderTextColor='grey'
                      onChangeText={e => setComment(e)}
                      value={comment}
                  />
                  <TouchableOpacity
                      onPress={() => {
                          Keyboard.dismiss();
                          console.log(comment)
                          setComment('')
                          uploadComment();
                      }}
                      style={styles.brock_button}
                  >
                    <Text>🔎</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal={false} style={styles.box}>
                    {modalInfo === null ? 'yarp' : getComments()}
                </ScrollView>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Return</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            
          </View>


        </View>
      );
  }

    

export default Chat;