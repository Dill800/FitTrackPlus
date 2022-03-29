
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

const Login = ({navigation}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const toHomeScreen = () => {
        navigation.navigate('Home')
    }

    const toRegisterScreen = () => {
        navigation.navigate('Register')
    }

    const toWorkoutLog = () => {
        navigation.navigate('WorkoutLog')
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
                    <TextInput placeholder='Password' placeholderTextColor="grey" secureTextEntry={true}></TextInput>
                </View>
                <Button title="Login" onPress={toHomeScreen}></Button>
                <Button title="Register" onPress={toRegisterScreen}></Button>
                
                
                <TouchableOpacity
                    onPress={onPress=toWorkoutLog}
                    style={[styles.btn_shape, { backgroundColor: "#7146ff" }]}
                >
                    <Text style={styles.btn_text}>Shortcut to WorkoutLog</Text>
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