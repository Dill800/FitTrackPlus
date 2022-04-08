import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation } from '@react-navigation/native'

const WeightLogList = ({navigation}) => {

    const navi = useNavigation();

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
                onPress={() => {
                    navi.navigate("Weight Log");
                }}
                style={[styles.button, {borderTopLeftRadius: 15, 
                    borderBottomLeftRadius: 15,
                    marginHorizontal: 0
                }]}
            >
                <Text>Back</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: "#71ebeb",
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: 40,
        margin: 10,
        marginLeft: 0,
        justifyContent: "center",
        paddingHorizontal: 20
    },
})

export default WeightLogList;