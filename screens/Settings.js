import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername } from '../redux/actions/user';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import qs from 'qs'

import * as themeActions from "../redux/actions/theme";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import reducers from "../redux/state/reducers";

const Settings = ({ navigation }) => {

  const dispatch = useDispatch()
  const userData = useSelector(state => state.user);

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

  const [image, setImage] = useState(null);
  const [pfp, setPfp] = useState('');
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(JSON.stringify(_image));
    //console.log(_image.uri);
    //console.log(_image);


    if (!_image.cancelled) {
      setImage(_image.uri);

      SaveToPhone(_image.uri);

    }
  };


  const SaveToPhone = async (item) => {
    // Remember, here item is a file uri which looks like this. file://..
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const asset = await MediaLibrary.createAssetAsync(item);
        MediaLibrary.createAlbumAsync('Images', asset, false)
          .then(() => {
            console.log('File Saved Successfully!');
          })
          .catch(() => {
            console.log('Error In Saving File!');
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Need Storage permission to save file');
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

      <View style={[styles.container2, {backgroundColor: themeReducer.theme ? '#121212' : '#f2f2f2'},]}>
        {
          image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        }

        <Image
          source={streakImageURL}
          resizeMode='contain'
          style={{
            flex: 1,
            width: '100%',
          }}
        />


      </View>

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
        onPress={toLoginScreen}
        style={[styles.btn_shape, { backgroundColor: "red" }]}
      >
        <Text style={styles.btn_text}>Log Out</Text>
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
  container2: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    marginBottom: 50
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
});


export default Settings;