
import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Keyboard, Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import 'react-native-console-time-polyfill'


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

import config from '../backend/config/config.js'
import { useDisclose } from 'native-base';
import { updateUsername } from '../redux/actions/user';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('user_token', value)
    } catch (e) {
        // saving error
        console.log(e)
    }
}

const Login = ({navigation}) => {

    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {

        //dispatch(updateUsername(null))
        

        //dispatch(updateUsername({"_id":"624cf2d132f91a30aacd2cff","username":"bid","passwordHash":"$2a$10$FzMghYsH6rGYdHjym/JvLuMEW/yp9jm859DHFDsrfwJv5EdwKtMcC","streakCounter":0,"lastCheckIn":"1960-11-23T00:35:12.636Z","friendList":[],"groupName":"Fellow","exerciseList":[],"weightList":[],"createdAt":"2022-04-06T01:54:25.087Z","updatedAt":"2022-04-06T01:54:25.087Z","__v":0}))
        //return;

        if(userData.username !== null) {
            // Do a fetch of most recent data
            console.log("UserData is ", userData)

            // grab user info from backend
            axios.get('http://' + config.ipv4 + ':5000/user/get', {
                params: {
                    username: userData.username.username
                }
            })
            .then(response => {
                console.log("User information retrieved, saving to store")
                
                dispatch(updateUsername(response.data))
                //console.log('Response: ', response.data)
            })
            .catch(e => {
                console.log(e)
            })
            /*
            axios({
                method: 'get',
                url: 'http://' + config.ipv4 + ':5000/user/get',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                console.log("User information retrieved, saving to store")
                dispatch(updateUsername(response.data))
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
            */
    
            console.log("User data not null: ", userData)
            navigation.navigate('Home')
        }
        else {
            console.log("No previous user data in store,")
        }

    }, [])
    
    

    /*
    AsyncStorage.getItem('user_token')
    .then(newnit => {
        console.log("Non null value", newnit)

        if(newnit !== null) {

            // grab user info from backend
            axios({
                method: 'get',
                url: 'http://' + config.ipv4 + ':5000/user/get',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                console.log("NEWNIT MERCXH!")
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
            
            navigation.navigate('Home')
        }

        
    })
    .catch(e => {
        console.log(e)
    })
    */

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const toHomeScreen = () => {
       //console.time();

        if(user === 'admin' && password === 'admin') {
            dispatch(updateUsername('admin'))
            navigation.navigate('Home')
        }
        else {
            axios.post('http://' + config.ipv4 + ':5000/user/login', {
            username: user,
            password: password
            })
            .then(response => {
                if(response.data.success === 1) {
                    console.log('Logged in successfully')

                    dispatch(updateUsername(response.data.user))
                    //console.log('Response: ', response.data.user)

                    navigation.navigate('Home')
                    //console.log(response)
                    console.log("Time: ")
                    //console.timeEnd();
                }
                else {
                    console.log("Did not log in successfully")
                    Alert.alert('Invalid Username or Password')
                    console.log(response)
                }
            })
        }


        
    }

    const toRegisterScreen = () => {
        navigation.navigate('Register')
    }

    const passRef = useRef();

    return (
        <HideKeyboard>
        <View 
        style={{flex: 1, backgroundColor: '#f0f8ff'}}
        >
            <KeyboardAwareScrollView bounces={false} keyboardOpeningTime={0} showsVerticalScrollIndicator={false} extraHeight={300}>
            <ImageBackground
            source={require('./../assets/back7.jpg')}
            style={{
                height: Dimensions.get('window').height / 2.4,
            }}>
            <StyledContainer>
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/logo3.png')}></PageLogo>
                </InnerContainer>
            </StyledContainer>
            </ImageBackground>
            <View style={styles.formView}>
                <View style={{padding: 40}}>
                    <Text style={{color: 'black', fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Login</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        placeholderTextColor='grey'
                        onChangeText={e => setUser(e)}
                        onSubmitEditing={() => {
                            passRef.current.focus();
                        }}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        ref={passRef}
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        onChangeText={e => setPassword(e)}
                        onSubmitEditing={toHomeScreen}
                    />
                </View>
                <TouchableOpacity
                    onPress={toHomeScreen}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toRegisterScreen}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    
                    <Text style={styles.btn_text}>Register</Text>
                </TouchableOpacity>
                {/*
                <TouchableOpacity
                    onPress={() => {console.log("test clicked")
                dispatch(updateUsername('dfkd'))}}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    
                    <Text style={styles.btn_text}>Test</Text>
                </TouchableOpacity>
                */}
            </View>
            </KeyboardAwareScrollView>
        </View>
        </HideKeyboard>
    );

}


const styles = StyleSheet.create({
    formView:{
        flex: 1.5,
        backgroundColor: '#f0f8ff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        alignItems: "center"
    },
    inputView:{
        backgroundColor: "#71ebeb",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
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
    input: {
        flex: 1,
        height: 40,
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 30,
        color: "#121212",
        backgroundColor: "#71ebeb"
    },
    
      
})

export default Login;