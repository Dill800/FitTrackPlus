import * as React from "react";
import { useState } from "react";
import { Component } from "react";
import Svg from "react-native-svg";


import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Donut from '../navigation/Donut'
import CircularProgress from "react-native-circular-progress-indicator";
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { VictoryPie } from "victory-native";
import { Center } from "native-base";

import {useSelector, useDispatch} from 'react-redux'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';
import { useDrawerStatus } from "@react-navigation/drawer";

const Macros = ({ navigation }) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        scroll: {
            width: "100%",
            alignItems: "center"
        },
        progress: {
            width: "95%",
            height: 125,
            marginTop: 15,
            alignItems: "center",
        },
        title_box: {
            backgroundColor: "rgba(74,144,226,1)",
            borderRadius: 10,
            width: "95%",
            height: 40,
            justifyContent: "center",
        },
        title: {
            color: "rgba(255,255,255,1)",
            fontSize: 22,
            alignSelf: "center",
        },
        progress_container: {
            flexDirection: "row",
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
        },
        progress_box: {
            backgroundColor: theme.colors.card,
            width: "40%",
            height: 55,
            borderRadius: 10,
            marginHorizontal: 25,
        },
        progress_title: {
            color: theme.colors.text,
            alignSelf: "center",
            marginVertical: 4,
        },
        progress_value: {
            color: "#121212",
            fontSize: 20,
            fontWeight: "bold",
            alignSelf: "center",
        },
        exercise_container: {
            width: "95%",
            height: 400,
            alignItems: "center",
        },
        box: {
            backgroundColor: "rgba(213,218,223,1)",
            borderRadius: 10,
            width: "95%",
            height: 275,
            alignSelf: "center",
        },
        btn_box: {
            flexDirection: "row",
            width: "75%",
            alignSelf: "center",
            justifyContent: "center",
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
        macrosText: {
            padding: 100,
        },
    })

    const navi = useNavigation();
    let foodList = [];
    const donutData = [{
        percentage: 1700,
        color: 'tomato',
        max: 2400,
        calorie: true,
        dataLabel: "calorie"
    }, {
        percentage: 76,
        color: 'skyblue',
        max: 92,
        calorie: false,
        dataLabel: "fat"
    }, {
        percentage: 130,
        color: 'gold',
        max: 150,
        calorie: false,
        dataLabel: "protein"
    }, {
        percentage: 200,
        color: 'forestgreen',
        max: 400,
        calorie: false,
        dataLabel: "carb"
    }];


    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 200,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >


    </View>);
    
    let fatPie = Math.round((userData.username.currentFat * 9) / userData.username.currentCalorie) * 100;
    console.log("fatpie ", fatPie);
    let proteinPie = Math.round((userData.username.currentProtein * 4) / userData.username.currentCalorie) * 100;
    let carbPie = Math.round((userData.username.currentCarb * 4) / userData.username.currentCalorie) * 100;
    let pieData = [
        { x: 1, y: {fatPie}, label: "Fat" },
        { x: 2, y: {proteinPie}, label: "Protein"},
        { x: 3, y: {carbPie}, label: "Carbs" }
    ];
    if (fatPie == 0 || isNaN(fatPie)) {
        pieData[0] = {};
        //console.log("hit");
    }
    if (proteinPie == 0 || isNaN(proteinPie)) {
        pieData[1] = {};
    }
    if (carbPie == 0 || isNaN(carbPie)) {
        pieData[2] = {};
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} contentContainerStyle={{alignItems: "center"}}>


                <View style={styles.progress}>
                    <View style={styles.title_box}>
                        <Text style={styles.title}>Target Macros</Text>
                    </View>
                    <View style={styles.progress_container}>
                    <View style={styles.progress_box}>
                        <Text style={styles.progress_title}>Calories: {userData.username.calorieGoal}</Text>
                        <Text style={styles.progress_title}>Protein: {userData.username.goalProtein} g</Text>
                        
                    </View>
                    <View style={styles.progress_box}>
                        <Text style={styles.progress_title}>Fat: {userData.username.goalFat} g</Text>
                        <Text style={styles.progress_title}>Carbs: {userData.username.goalCarb} g</Text>
                    </View>
                </View>


                </View>


                <View style={styles.exercise_container}>




                    <View
                        style={[
                            styles.title_box,
                            { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10 },
                        ]}
                    >
                        <Text style={styles.title}>Today's Progress</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>


                        <CircularProgress
                            radius={80}
                            value={Math.round(userData.username.currentCalorie / userData.username.calorieGoal)}
                            textColor='#222'
                            fontSize={20}
                            valueSuffix={'%'}
                            activeStrokeColor={'tomato'}
                            inActiveStrokeColor={'tomato'}
                            inActiveStrokeOpacity={0.2}
                            duration={500}
                            title='Calories'

                        />
                        <CircularProgress
                            radius={80}
                            value={Math.round(userData.username.currentFat / userData.username.goalFat)}
                            textColor='#222'
                            fontSize={20}
                            valueSuffix={'%'}
                            activeStrokeColor={'skyblue'}
                            inActiveStrokeColor={'skyblue'}
                            inActiveStrokeOpacity={0.2}
                            title='Fat'

                        />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CircularProgress
                            radius={80}
                            value={Math.round(userData.username.currentProtein / userData.username.goalProtein)}
                            textColor='#222'
                            fontSize={20}
                            valueSuffix={'%'}
                            activeStrokeColor={'gold'}
                            inActiveStrokeColor={'gold'}
                            inActiveStrokeOpacity={0.2}
                            title='Protein'

                        />
                        <CircularProgress
                            radius={80}
                            value={Math.round(userData.username.currentCarb / userData.username.goalCarb)}
                            textColor='green'
                            fontSize={20}
                            valueSuffix={'%'}
                            activeStrokeColor={'forestgreen'}
                            inActiveStrokeColor={'forestgreen'}
                            inActiveStrokeOpacity={0.2}
                            title='Carbs'

                        />

                    </View>

                </View>


                <View style={styles.btn_box}>
                    <TouchableOpacity
                        onPress={() => {
                            navi.navigate("Meals");
                        }}
                        style={[
                            styles.btn_shape,
                            { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 }, 
                        ]}
                    >
                        <Text style={styles.btn_text}>Meals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navi.navigate("Edit Macros");
                        }}
                        style={[
                            styles.btn_shape,
                            { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                        ]}
                    >
                        <Text style={styles.btn_text}>Adjust Macros</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ color: theme.colors.text, paddingTop: 30, fontSize: 30, textAlign: 'center' }}>Calories: {userData.username.currentCalorie}</Text>
                <VictoryPie
                    //padAngle={({ datum }) => datum.y}
                    // innerRadius={0}
                    colorScale={["skyblue", "gold", "forestgreen"]}
                    // padAngle={0}
                    data={pieData}
                    style={{
                        labels: {
                            fill: theme.colors.text
                        }
                    }}


                />

                <View style={{ padding: 50 }}>
                    <Text></Text>
                </View>

            </ScrollView>
        </View>

    );
}



export default Macros;