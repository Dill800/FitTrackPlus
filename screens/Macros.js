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
import * as Progress from 'react-native-progress'
import {useSelector, useDispatch} from 'react-redux'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';
import { useDrawerStatus } from "@react-navigation/drawer";
import { useIsFocused } from '@react-navigation/native'

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
            color: theme.colors.text,
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
            color: theme.colors.text,
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
    const isFocused = useIsFocused()
    //console.log(isFocused);


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
    // let pieData = [
    //     { x: 1, y: {fatPie}, label: "Fat" },
    //     { x: 2, y: {proteinPie}, label: "Protein"},
    //     { x: 3, y: {carbPie}, label: "Carbs" }
    // ];
    // if (fatPie == 0 || isNaN(fatPie)) {
    //     pieData[0] = {};
    //     //console.log("hit");
    // }
    // if (proteinPie == 0 || isNaN(proteinPie)) {
    //     pieData[1] = {};
    // }
    // if (carbPie == 0 || isNaN(carbPie)) {
    //     pieData[2] = {};
    // }

    

    let sumCals = () => {
        let x = 0;
        for(let i = 0; i < userData.username.mealList.length; i++) {
            let date = new Date(userData.username.mealList[i].date)
            let today = new Date()
            //console.log(today.getDate(), today.getMonth(), today.getFullYear())
            //console.log(date.getDate(), date.getMonth(), date.getFullYear())
            let meal = userData.username.mealList[i];
            if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                x = x + parseInt(meal.calories);
            }
        }
        return x;
    }
    sumCals()

    let sumProt = () => {
        let x = 0;
        for(let i = 0; i < userData.username.mealList.length; i++) {
            let date = new Date(userData.username.mealList[i].date)
            let today = new Date()
            //console.log(today.getDate(), today.getMonth(), today.getFullYear())
            //console.log(date.getDate(), date.getMonth(), date.getFullYear())
            let meal = userData.username.mealList[i];
            if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                x = x + parseInt(meal.protein);
            }
        }
        return x;
    }
    sumProt()

    let sumFat = () => {
        let x = 0;
        for(let i = 0; i < userData.username.mealList.length; i++) {
            let date = new Date(userData.username.mealList[i].date)
            let today = new Date()
            let meal = userData.username.mealList[i];
            if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                x = x + parseInt(meal.fat);
            }
        }
        return x;
    }
        sumFat()

    let sumCarbs = () => {
        let x = 0;
        for(let i = 0; i < userData.username.mealList.length; i++) {
            let date = new Date(userData.username.mealList[i].date)
            let today = new Date()
            let meal = userData.username.mealList[i];
            if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                x = x + parseInt(meal.carbs);
            }
        }
        return x;
    }
    sumCarbs()
    
    const donutData1 = [{
        percentage: sumCals(),
        color: 'tomato',
        max: userData.username.calorieGoal,
        calorie: true,
        dataLabel: "Calories",
        radius: 70
      }, {
        percentage: sumFat(),
        color: 'skyblue',
        max: userData.username.goalFat,
        calorie: false,
        dataLabel: "Fat",
        radius: 70
      }];


      const donutData2 = [{
        percentage: sumProt(),
        color: 'gold',
        max: userData.username.goalProtein,
        calorie: false,
        dataLabel: "Protein",
        radius: 70       
      }, {
        percentage: sumCarbs(),
        color: 'forestgreen',
        max: userData.username.goalCarb,
        calorie: false,
        dataLabel: "Carbs",
        radius: 70
      }];

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} contentContainerStyle={{alignItems: "center"}}>


                <View style={styles.progress}>
                    <View style={styles.title_box}>
                        <Text style={styles.title}>Target Macros 🎯</Text>
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
                            { backgroundColor: theme.colors.third, marginVertical: 10 },
                        ]}
                    >
                        <Text style={styles.title}>Today's Progress</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        {
                        donutData1.map((p, i) => {
                            return <View style={{marginHorizontal: 15, marginTop: 5}}>
                                <Donut key={i} radius={p.radius} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} calorie={p.calorie} dataLabel={p.dataLabel} />
                                    </View>
                                
                        })                        
                        }


                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                    {
                        donutData2.map((p, i) => {
                            return <View style={{marginHorizontal: 15, marginTop: 5}}>
                            <Donut key={i} radius={p.radius} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} calorie={p.calorie} dataLabel={p.dataLabel} />
                                </View>
                        })                        
                        }

                        

                    </View>

                </View>


                <View style={[styles.btn_box, {marginTop: 40}]}>
                    <TouchableOpacity
                        onPress={() => {
                            navi.navigate("Meals");
                        }}
                        style={[
                            styles.btn_shape,
                            { backgroundColor: theme.colors.third, marginHorizontal: 10 }, 
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
                            { backgroundColor: theme.colors.third, marginHorizontal: 10 },
                        ]}
                    >
                        <Text style={styles.btn_text}>Adjust Macros</Text>
                    </TouchableOpacity>
                </View>

              

            </ScrollView>
        </View>

    );
}



export default Macros;