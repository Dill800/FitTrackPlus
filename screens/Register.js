
import React, {useState, useEffect} from 'react';
import { Keyboard, TouchableWithoutFeedback, Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert} from 'react-native';

import axios from 'axios'
import qs from 'qs'

import config from '../backend/config/config.js'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const Register = ({navigation}) => {

    const toLoginScreen = () => {
        navigation.navigate('Login')
    }

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const registerAccount = () => {
        
        console.log('user: ', user)
        console.log('password: ', password)

        if(user === '' || password === '') {
            Alert.alert("Missing Fields", "Please enter a valid username and password.")
        }

        var data = qs.stringify({
            'username': user,
            'passwordHash': password 
        });

        axios({
            method: 'post',
            url: 'http://' + config.ipv4 + ':5000/user/register',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        })
        .then(reponse => {
            console.log(JSON.stringify(reponse.data))
        })
        .catch(e => {
            console.log(e)
        })
        

    }

    return (
        <HideKeyboard>
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
                    <Text style={{color: 'black', fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Create Account</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        placeholderTextColor='grey'
                        onChangeText={e => setUser(e)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        onChangeText={e => setPassword(e)}
                    />
                </View>
                <TouchableOpacity
                    onPress={registerAccount}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    <Text style={styles.btn_text}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toLoginScreen}
                    style={[
                    styles.btn_shape,
                    { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    <Text style={styles.btn_text}>Back</Text>
                </TouchableOpacity>
                
            </View>
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

export default Register;