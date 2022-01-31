
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button} from 'react-native';

const Register = ({navigation}) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Register</Text>
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