import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import { updateUsername } from '../redux/actions/user';
import { AntDesign } from '@expo/vector-icons';

import * as themeActions from "../redux/actions/theme";
import * as ImagePicker from 'expo-image-picker';
import reducers from "../redux/state/reducers";

const Settings = ({navigation}) => {

    const dispatch = useDispatch()

    const [image, setImage] = useState(null);
    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });

      console.log(JSON.stringify(_image));

      if (!_image.cancelled) {
        setImage(_image.uri);
        
      }
    };

    

    const toLoginScreen = () => {
      /*
      AsyncStorage.removeItem('user_token')
      .then(res => {
        console.log(res)
        navigation.navigate('Login')
      })
      */
      dispatch(updateUsername(null))
      navigation.navigate('Login')
        
    }

    const goBack = () => {
        navigation.goBack()
    }

    const themeReducer = useSelector(({ themeReducer }) => themeReducer);

    const [mode, setMode] = useState(false);
    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                          {
                              image  &&<Image source={{ uri: image }} style={{ width: 150, height: 150}} />
                          }

                <View style={styles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
                </View>


            </View>
            <TouchableOpacity
                onPress={toLoginScreen}
                style={[styles.btn_shape, { backgroundColor: "red" }]}
                >
                <Text style={styles.btn_text}>Log Out</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                    onPress={goBack}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    <Text style={styles.btn_text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={[
                    styles.btn_shape,
                    { backgroundColor: themeReducer.theme ? '#fff' : '#000', marginHorizontal: 10 },
                    ]}
                    onPress={() => {
                      // if (!mode) {
                      //   setMode(true);
                      // } else {
                      //   setMode(false);
                      // }

                      dispatch(themeActions.ToggleTheme(!themeReducer.theme));
                      console.log(mode + ' ' + themeReducer.theme)
                    }}
                >
                    <Text 
                      style={{
                        color: themeReducer.theme ? '#000' : '#fff',
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "bold"
                      }}>
                        {themeReducer.theme ? 'Light Mode' : 'Dark Mode'}
                    </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      //justifyContent: "center",
      alignItems: "center",
      // backgroundColor: '#121212'
    },
    input_box: {
      width: "75%",
      height: 40,
      marginBottom: 25,
    },
    input_title: {
      color: "#121212",
      marginTop: -20,
    },
    input_placeholder: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      color: "#121212",
      backgroundColor: "rgba(230,230,230,1)",
    },
    btn_shape: {
      backgroundColor: "rgba(99,206,237,1)",
      borderRadius: 10,
      width: "40%",
      height: 40,
      marginBottom: 15,
      justifyContent: "center",
    },
    btn_text: {
      fontSize: 16,
      textAlign: "center",
      fontWeight: "bold",
    },
    container2:{
      elevation:2,
      height:150,
      width:150,
      backgroundColor:'#efefef',
      position:'relative',
      borderRadius:999,
      overflow:'hidden',
      alignItems: 'center',
      justifyContent: 'center', 
      marginTop: 150,
      marginBottom: 50
  },
  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'25%',
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center'
  }
});


export default Settings;