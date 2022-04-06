
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';

import axios from 'axios'
import qs from 'qs'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'


const Register = ({navigation}) => {

    const toLoginScreen = () => {
        navigation.navigate('Login')
    }

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const registerAccount = () => {
        
        console.log('user: ', user)
        console.log('password: ', password)

        var data = qs.stringify({
            'username': user,
            'passwordHash': password 
        });

        axios({
            method: 'post',
            url: 'http://192.168.0.190:5000/user/register',
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

        /*
        try {
            axios.post('http://localhost:5000/user/register',
            {username: user,
            password: password})
            .then(response => {
                console.log(response)
            })
        }
        catch (e) {
            console.log(e)
        }
        */
        

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
                    <Text style={{color: 'black', fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Create Account</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder='Username' placeholderTextColor="grey" onChangeText={e => setUser(e)}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder='Password' placeholderTextColor="grey" onChangeText={e => setPassword(e)} secureTextEntry={true}></TextInput>
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

export default Register;