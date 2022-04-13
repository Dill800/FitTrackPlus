import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import {RefreshControl, Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable, TouchableWithoutFeedback} from "react-native";
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';

import {ChatText} from '../components/chatText'

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    },
    leftArrow: {
      position: "absolute",
      backgroundColor: theme.colors.secondary,
      //backgroundColor:"red",
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomRightRadius: 25,
      left: -10
  },
  leftArrowOverlap: {
      position: "absolute",
      backgroundColor: theme.colors.card,
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomRightRadius: 18,
      left: -20
  
  },
  rightArrow: {
  position: "absolute",
  backgroundColor: '#0078fe',
  //backgroundColor:"red",
  width: 20,
  height: 25,
  bottom: 0,
  borderBottomLeftRadius: 25,
  right: -10
},

rightArrowOverlap: {
  position: "absolute",
  backgroundColor: theme.colors.card,
  //backgroundColor:"green",
  width: 20,
  height: 35,
  bottom: -6,
  borderBottomLeftRadius: 18,
  right: -20

},
    })

    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGroupName, setGroupName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [comment, setComment] = useState();
    const [postModal, setPostModal] = useState(false);
    const [postTitle, setPostTitle] = useState();
    const [postBody, setPostBody] = useState();
    
    const [wormhole, setWormhole] = useState(0);
    const [wormhole2, setWormhole2] = useState(0);

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
            let bigDog = JSON.stringify(response.data);
            let biggerDog = (JSON.parse(bigDog));
            for (var i = 0; i < biggerDog.length; i++) {
              var chat  = {
                "id" : biggerDog[i]._id,
                "title" : biggerDog[i].title,
                "body" : biggerDog[i].body,
                "username" : biggerDog[i].username,
                "comments" : biggerDog[i].comments,
                "date" : biggerDog[i].createdAt,
                "groupName" : biggerDog[i].groupName
              };

              
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


    },[wormhole])

    let please = () => {

        for (var i = 0; i < chatList.length; i++) {
            if(chatList[i].groupName === userData.username.groupName)
            chats.push(
                <ChatText setModalInfo={setModalInfo} setModalVisible={setModalVisible} key={i} i={i} body={chatList[i].body} title={chatList[i].title} username={chatList[i].username} comments={chatList[i].comments} id={chatList[i].id}/>
            )
        }
    }
    please()

    
 
    const post = () => {

        axios.post('http://' + config.ipv4 + ':5000/chat/create', {
            title: postTitle,
            body: postBody,
            username: userData.username.username,
            groupName: userData.username.groupName
        })
        .then(res => {
            
            setWormhole(wormhole+1)
            setPostBody("")
            setPostTitle("")
            setPostModal(false)
            setTimeout(() => {  setWormhole2(wormhole2+1) }, 200);


        })
        .catch(e => {
            console.log("error", e)
        })

        setWormhole(wormhole+1)

    }

    const getComments = () => {

        let x = [];

        for(var i = 0; i < modalInfo.comments.length; i++) {
            x.push(
                modalInfo.comments[i].username != userData.username.username ?
                <View>
                <Text style={{paddingHorizontal: 15, marginBottom: 5, fontSize: 14, color: theme.colors.text, fontStyle: 'italic'}}>{modalInfo.comments[i].username}</Text>
                <View
                style={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: 15,
                    padding: 15,
                    maxWidth: 250 ,
                    marginHorizontal: 10,
                    alignSelf: 'flex-start',
                    marginBottom: 10
                }}
                key={i}
                >
                    <Text style={{fontSize: 18, color: theme.colors.text}}>{modalInfo.comments[i].comment}</Text>
                    <View style={styles.leftArrow}>
  
                      </View>
                      <View style={styles.leftArrowOverlap}></View>
                </View>
                </View>
              :
              <View
                style={{
                    backgroundColor: '#0078fe',
                    borderRadius: 15,
                    padding: 15,
                    maxWidth: 250 ,
                    flexGrow: 1,
                    marginHorizontal: 10,
                    alignSelf: 'flex-end',
                    marginBottom: 10
                }}
                key={i}
                >
                    <Text style={{fontSize: 18, color: theme.colors.text}}>{modalInfo.comments[i].comment}</Text>
                    <View style={styles.rightArrow}>
  
                      </View>
                      <View style={styles.rightArrowOverlap}></View>
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

        })
        .catch(e => {
            console.log("error", e)
        })

    }

    
    
    const passRef = useRef();

      return (
          
        <View style={styles.container}>
          <View style={styles.exercise_container}>
              
            <View
              style={[
                styles.title_box,
                { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10,
              },
              ]}
            >
                <Text style={styles.title}>{userData.username.groupName}'s Chatroom 💬</Text>
            </View>
            <ScrollView horizontal={false} style={styles.box} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            refreshControl={
                <RefreshControl title="Pull to refresh"
                tintColor={theme.colors.text}
                titleColor={theme.colors.text} onRefresh={() => {
                    setWormhole(wormhole+1)
                    setTimeout(() => {  setWormhole2(wormhole2+1); }, 200);
                }}/>
                }
            >
                    <Text>{chats}</Text>
              
            </ScrollView>
          </View>
          <View style={styles.btn_box}>



              
          <Modal
              animationType="slide"
              transparent={true}
              visible={postModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setPostModal(false);
              }}
            >
              <HideKeyboard>
              <KeyboardAwareScrollView bounces={false} keyboardOpeningTime={0} showsVerticalScrollIndicator={false} extraHeight={150} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Create Post</Text>
                  <View style={[styles.inputView, {flexDirection: 'column', height: 250, width: '100%', marginBottom: 0}]}>
                            <TextInput
                                style={[styles.input, 
                                        {flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 10, width: '70%'}]}
                                placeholder='Title'
                                placeholderTextColor='grey'
                                onChangeText={e => setPostTitle(e)}
                                value={postTitle}
                                onSubmitEditing={() => {
                                  passRef.current.focus();
                              }}
                            />
                            <TextInput
                                ref={passRef}
                                style={[styles.input, {borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 10, width: '70%', paddingTop: 15, paddingBottom: 15}]}
                                placeholder='Body'
                                placeholderTextColor='grey'
                                onChangeText={e => setPostBody(e)}
                                value={postBody}
                                multiline={true}
                                onSubmitEditing={() => post()}
                            />


                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, {marginTop: 0, width: '20%'}]}
                                onPress={() => post()}
                            >
                                <Text style={styles.textStyle}>Post</Text>
                            </TouchableOpacity>


                        </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose, {width: '20%'}]}
                    onPress={() => setPostModal(false)}
                  >
                    <Text style={styles.textStyle}>Return</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </KeyboardAwareScrollView>
              </HideKeyboard>
            </Modal>


              
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(false);
              }}
            >
              <HideKeyboard>
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
              </HideKeyboard>
            </Modal>
            <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setPostModal(true)}
                  >
                    <Text style={styles.textStyle}>Create Post</Text>
            </TouchableOpacity>

          </View>


        </View>
      );
  }

    

export default Chat;