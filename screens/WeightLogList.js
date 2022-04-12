import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import { Logger } from './../components/styles'

const WeightLogList = ({navigation}) => {

    const theme = useTheme();

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
            backgroundColor: theme.colors.primary,
            borderRadius: 30,
            width: "70%",
            height: 45,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        button: {
            backgroundColor: theme.colors.primary,
            borderRadius: 15,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: 40,
            margin: 10,
            marginLeft: 0,
            justifyContent: "center",
            paddingHorizontal: 20
        },
        header: {
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: "95%",
            padding: "5%",
            paddingBottom: 0,
            height: 70,
            alignSelf: "center",
            justifyContent: "flex-end"
        },
        box: {
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            width: "95%",
            height: 450,
            alignSelf: "center",
            padding: '5%',
            paddingTop: 0,
        },
        container: {
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
        },
        head: { 
            height: 40, 
            backgroundColor: theme.colors.secondary, 
        },
        text: { 
            margin: 6 
        },
        row: {
            backgroundColor: theme.colors.card,
        }
    })

    const navi = useNavigation();

    const tableHead = ['Date', 'Weight', '+/-', 'Edit']

    // const tableData = [
    //     ['3/1', '201.2', 'x', 'x'],
    //     ['3/2', '200.8', 'x', 'x'],
    //     ['3/3', '200.7', 'x', 'x'],
    //     ['3/4', '201.0', 'x', 'x'],
    //     ['3/5', '200.3', 'x', 'x'],
    //     ['3/6', '200.1', 'x', 'x'],
    //     ['3/7', '199.6', 'x', 'x'],
    //     ['3/8', '199.2', 'x', 'x'],
    //     ['3/9', '200.4', 'x', 'x'],
    //     ['3/10', '199.1', 'x', 'x'],
    //     ['3/11', '198.3', 'x', 'x'],
    //     ['3/12', '197.3', 'x', 'x'],
    //     ['3/13', '197.9', 'x', 'x'],
    //     ['3/14', '197.2', 'x', 'x'],
    //     ['3/15', '196.9', 'x', 'x'],

    // ]

    const dates = ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15", "3/16", "3/17", "3/18", "3/19", "3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26", "3/27", "3/28", "3/29", "3/30", "3/31", "4/1", "4/2", "4/3", "4/4", "4/5", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12", "4/13"];
    const weights = [201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9, 201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9, 201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9];


    var tableData = [];
    for (let i = dates.length - 1; i >= 0; i--) {
        let diff = 0;
        if (i != dates.length - 1) {
            diff = weights[i + 1] - weights[i];
        }
        tableData.push([dates[i], weights[i], diff.toFixed(2), '']);
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Logger>
            <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Log List</Text>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Table borderStyle={{borderWidth: 2, borderColor: theme.colors.text}}>
                        <Row data={tableHead} style={styles.head} textStyle={{margin: 6, color: theme.colors.text}}/>
                    </Table>
                </View>
                <ScrollView horizontal={false} style={styles.box} showsVerticalScrollIndicator={false}>
                    <Table borderStyle={{borderWidth: 2, borderColor: theme.colors.text}}>
                        {/* <Rows style={{color: theme.colors.primary}} data={tableData} textStyle={{color: theme.colors.text, margin: 6}}/> */}
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.row, index%2 && {backgroundColor: theme.colors.secondary}]}
                                    textStyle={{margin: 6, color: theme.colors.text}}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>
            </Logger>
        </View>
      );

}

export default WeightLogList;