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
            height: 100,
            alignSelf: "center",
            justifyContent: "flex-end"
        },
        box: {
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            width: "95%",
            height: 425,
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
            backgroundColor: '#f1f8ff' 
        },
        text: { 
            margin: 6 
        }
    })

    const navi = useNavigation();

    const tableHead = ['Date', 'Weight', '7 Day Avg', '+/-']

    const tableData = [
        ['3/1', '201.2', 'x', 'x'],
        ['3/2', '200.8', 'x', 'x'],
        ['3/3', '200.7', 'x', 'x'],
        ['3/4', '201.0', 'x', 'x'],
        ['3/5', '200.3', 'x', 'x'],
        ['3/6', '200.1', 'x', 'x'],
        ['3/7', '199.6', 'x', 'x'],
        ['3/8', '199.2', 'x', 'x'],
        ['3/9', '200.4', 'x', 'x'],
        ['3/10', '199.1', 'x', 'x'],
        ['3/11', '198.3', 'x', 'x'],
        ['3/12', '197.3', 'x', 'x'],
        ['3/13', '197.9', 'x', 'x'],
        ['3/14', '197.2', 'x', 'x'],
        ['3/15', '196.9', 'x', 'x'],

    ]

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Logger>
            <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Log List</Text>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={{margin: 6}}/>
                    </Table>
                </View>
                <ScrollView horizontal={false} style={styles.box} showsVerticalScrollIndicator={false}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        {/* <Rows style={{color: theme.colors.primary}} data={tableData} textStyle={{color: theme.colors.text, margin: 6}}/> */}
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.row, index%2 && {backgroundColor: theme.colors.card}]}
                                    textStyle={{margin: 6}}
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