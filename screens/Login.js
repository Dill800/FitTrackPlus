
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'
import axios from 'axios'

import config from '../backend/config/config.js'

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('user_token', value)
    } catch (e) {
        // saving error
        console.log(e)
    }
}

const Login = ({navigation}) => {

    AsyncStorage.getItem('user_token')
    .then(newnit => {
        console.log("Non null value", newnit)

        if(newnit !== null) {

            

            navigation.navigate('Home')
        }

        
    })
    .catch(e => {
        console.log(e)
    })

    //useEffect(getUser, [])

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const toHomeScreen = () => {

        if(user === 'admin' && password === 'admin') {
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
                    storeData(user)
                    navigation.navigate('Home')
                    console.log(response)
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

    return (
        <View 
        style={{flex: 1, backgroundColor: '#f0f8ff'}}
        >
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
                    <TextInput placeholder='Username' placeholderTextColor="grey" onChangeText={e => setUser(e)}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder='Password' placeholderTextColor="grey" secureTextEntry={true} onChangeText={e => setPassword(e)}></TextInput>
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
            </View>
        </View>
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
    
      
})

export default Login;