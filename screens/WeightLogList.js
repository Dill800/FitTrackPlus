import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {useSelector, useDispatch} from 'react-redux'
import { format } from 'date-fns'
import Swipeout from 'react-native-swipeout';


import config from '../backend/config/config.js'
import { Logger } from './../components/styles'
import { updateUsername } from '../redux/actions/user';


const WeightLogList = ({navigation}) => {

    const theme = useTheme();
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

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
            height: 50,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: theme.colors.text
        }
    })

    const navi = useNavigation();

    const tableHead = ['Date', 'Weight', '+/-']

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

    const logs = [];
    const [logList, setLogList] = useState([]);

    let swipeBtns = [
        {
            text: 'Edit',
            backgroundColor: 'blue',
            onPress: () => {

            }
        },
        {
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { 
                console.log()
            }
        } 
    ];

    var axios = require('axios');
    var qs = require('qs');

    var config2 = {
        method: 'get',
        url: 'http://' + config.ipv4 + ':5000/user/getWeightLog?username=' + userData.username.username,
        headers: { },
    };

    useEffect(() => {
        async function getLogList() {

            axios(config2)
                .then(function (response) {
                    let bigDog = JSON.stringify(response.data.data);
                    let biggerDog = (JSON.parse(bigDog));
                    // console.log(JSON.stringify(response.data));
                    for (var i = biggerDog.length - 1; i >= 0; i--) {
                        // console.log(biggerDog[i]);
                        // var friend  = {
                        //   "Username" : biggerDog[i].username,
                        //   "Streak" : biggerDog[i].streakCounter,
                        // };
                        // console.log(biggerDog[i]);
                        //console.log(frien;
                        let diff = 0;
                        if (i != 0) {
                            diff = biggerDog[i].weight - biggerDog[i - 1].weight;
                        }
                        // console.log(diff);
                        logs.push([format(new Date(biggerDog[i].date), "MMMM dd, yyyy"), biggerDog[i].weight + 'lbs.', diff.toFixed(2) + ' lbs.']);
                        // console.log(typeof(biggerDog[i].weight));
                        //setFriendsList(friendsList.concat(friend));
                        //setFriendsList(friendsList.concat(biggerDog[i].username));
                      }

                      setLogList(logs);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            // console.log('got da loot');

            // console.log ("TEST TEST TEST")
            // for (let i = 0; i < logList.length; i++) {
            //     console.log('hi ' + logs[i]);
            // }
        }

        getLogList();

        // for (let i = 0; i < logList.length; i++) {
        //     console.log('hi2 ' + logs[i]);
        // }

        // console.log ("TEST TEST TEST")
        // for (let i = 0; i < logList.length; i++) {
        //     console.log('hi ' + logs[i]);
        // }
    }, []);

    const user = logs.map((log) => {

    })

    var tableData = [];
    for (let i = dates.length - 1; i >= 0; i--) {
        let diff = 0;
        if (i != dates.length - 1) {
            diff = weights[i + 1] - weights[i];
        }

        // console.log(diff);
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
                    <Table borderStyle={{borderColor: theme.colors.text}}>
                        {
                            logList.map((rowData, index) => (
                                <Swipeout right={swipeBtns}
                                    autoClose='true'
                                    backgroundColor= 'transparent'>
                                    <Row
                                        key={index}
                                        data={rowData}
                                        style={[styles.row, index%2 && {backgroundColor: theme.colors.secondary}]}
                                        textStyle={{margin: 6, color: theme.colors.text}}
                                    />
                                </Swipeout>
                            ))
                        }
                    </Table>
                    {/* <Text>{'hi ' + logList[0]}</Text> */}
                </ScrollView>
            </View>
            </Logger>
        </View>
      );

}

export default WeightLogList;