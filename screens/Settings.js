import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import { updateUsername } from '../redux/actions/user';

import * as themeActions from "../redux/actions/theme";
import reducers from "../redux/state/reducers";

const Settings = ({navigation}) => {

    const dispatch = useDispatch()


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
      justifyContent: "center",
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
});


export default Settings;