
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button} from 'react-native';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'
import axios from 'axios'

const Login = ({navigation}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const toHomeScreen = (e) => {
        console.log('Username: ' + user)
        console.log('Password: ' + password)

        // Get data based on username, change URL
        axios.get('URL', 
        {
            'headers': {'user': user, 'password': password}
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })

        navigation.navigate('Home')
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
                <Button title="Login" onPress={(e) => toHomeScreen(e)}></Button>
                <Button title="Register" onPress={toRegisterScreen}></Button>
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

export default Login;