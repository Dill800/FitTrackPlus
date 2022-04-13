import * as React from "react";
import {useRef, useState, useEffect} from 'react';
import {Keyboard, useColorScheme, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, Pressable} from "react-native";
import { useTheme } from '@react-navigation/native';

const ChatText = (props) => {

    const [showComments, setShowComments] = useState(false)
    const theme = useTheme();

    const styles = StyleSheet.create({

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
          centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.text
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

    })

      return (
        
        
        <TouchableOpacity
        onPress={() => {
            //console.log(props)
            props.setModalVisible(true)
            props.setModalInfo({
                "title": props.title,
                "body": props.body,
                "username": props.username,
                "comments": props.comments,
                "id": props.id
            })
        }}
        activeOpacity={1}
        key= {props.i}
        style={{
          alignItems: "center",
          width: 350,
          height: 'auto',
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
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: theme.colors.text}}>{props.title}</Text>
          <Text style={{color: theme.colors.text}}>{props.body}</Text>
        </View>
      
      </TouchableOpacity>
      
      )
    }

    export {ChatText}