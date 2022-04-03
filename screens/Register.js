
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button} from 'react-native';

import axios from 'axios'
import qs from 'qs'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

const Register = ({navigation}) => {

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
                <Button title="Create" onPress={registerAccount}></Button>
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
    }
})

export default Register;