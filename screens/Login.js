
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button} from 'react-native';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

const Login = ({navigation}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView 
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
                <Button title="Login" onPress={() => console.log(user)}></Button>
            </View>
        </ScrollView>
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