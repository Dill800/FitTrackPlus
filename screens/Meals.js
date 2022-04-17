import React, {useRef, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { TouchableWithoutFeedback, Modal,Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useDrawerStatus } from "@react-navigation/drawer";
import {useSelector, useDispatch} from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';

import { updateUsername } from '../redux/actions/user';
import axios from 'axios'
import config from '../backend/config/config.js'

const Meals = ({navigation}) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
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
            backgroundColor: "rgba(213,218,223,1)",
            width: "40%",
            height: 55,
            borderRadius: 10,
            marginHorizontal: 25,
        },
        progress_title: {
            color: "#121212",
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
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            width: "95%",
            height: 275,
            alignSelf: "center",
        },
        btn_box: {
            flexDirection: "row",
            width: "75%",
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
        bottomNavigationView: {
            borderRadius: 10,
            height: '50%',
            justifyContent: 'center',
          },
        card_text: {
            color: theme.colors.text,
            fontSize: 15
        }
    })

    const navi = useNavigation();
    const scrollViewRef = useRef();
    let foodList = []

    let adjustedDate = new Date(Date.now());
    adjustedDate.setHours(adjustedDate.getHours() - 4)
    
    const [date, setDate] = useState(adjustedDate)
    
    const [visible, setVisible] = useState(false);
    const [detailMenuVisible, setDetailMenuVisible] = useState(false);
    const [actdate, setActdate] = useState(adjustedDate);

    const [fatCount, setFatCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [calorieCount, setCalorieCount] = useState(0);
    const [mealName, setMealName] = useState();
    const [originalMealName, setOriginalMealName] = useState();

    const themeReducer = useSelector(({ themeReducer }) => themeReducer);
    
    

    const [sid, setSid] = useState(0)

    // Controls visibility of date selector and edit menu
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    const toggleDetailMenu = () => {
        setDetailMenuVisible(!detailMenuVisible);
    };

      const onChange = (event, selectedDate) => {
        const currentDate = new Date(selectedDate);
        setDate(new Date(selectedDate));
        //currentDate.setDate(currentDate.getDate() - 1)
        setActdate(currentDate)

        console.log("dillon", currentDate)
      };

    const changeDate = () => {
        console.log(date)
        setSid(sid+1)
    }

    //console.log("About to run for loop, list length: ", userData.username.mealList.length)
    //console.log(new Date(Date.now()))
    console.log("ryan", actdate);
    for(let i = 0; i < userData.username.mealList.length; i++) {
        let x = new Date(userData.username.mealList[i].date)

        if(x.getDate() === actdate.getDate() && x.getMonth() === actdate.getMonth() && x.getFullYear() === actdate.getFullYear())

        // Meal w/ matching date found
        foodList.push(
            <TouchableOpacity onPress={() => {
                setFatCount(userData.username.mealList[i].fat)
                setProteinCount(userData.username.mealList[i].protein)
                setCarbCount(userData.username.mealList[i].carbs)
                setCalorieCount(userData.username.mealList[i].calories)
                setMealName(userData.username.mealList[i].mealName)
                setOriginalMealName(userData.username.mealList[i].mealName)
                setDate(x)
                toggleDetailMenu(); 
                }}>
            <View key = {i} style={{alignItems: "center", width: 370, height: 'auto', marginBottom: 15}}>
                <View key = {i} style={{backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "90%",}}>
                    <Text style={{ color: theme.colors.text, fontSize: 25, fontWeight: "bold" }}>{userData.username.mealList[i].mealName}</Text>
                    <Text style={[styles.card_text, {color: 'tomato', fontWeight: 'bold'}]}>Calorie:                       {userData.username.mealList[i].calories}</Text>
                    <Text style={[styles.card_text, {color: 'skyblue', fontWeight: 'bold'}]}>Fat:                               {userData.username.mealList[i].fat} g</Text>
                    <Text style={[styles.card_text, {color: 'gold', fontWeight: 'bold'}]}>Protein:                       {userData.username.mealList[i].protein} g</Text>
                    <Text style={[styles.card_text, {color: 'forestgreen', fontWeight: 'bold'}]}>Carb:                            {userData.username.mealList[i].carbs} g</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }

    // Update meal to Redux and DB when form is completed
    const updateMeal = () => {

        if(fatCount == '' || proteinCount == '' || carbCount == '' || calorieCount == '' || mealName == '') {
            return;
        }
        
        // Format data into object
        let mealData = {
            date: date,
            mealName: mealName,
            fat: fatCount,
            protein: proteinCount,
            carbs: carbCount,
            calories: calorieCount,
        }
        
        // Clear form after submitting
        setFatCount("")
        setProteinCount("")
        setCarbCount("")
        setCalorieCount("")
        setMealName("")
        setOriginalMealName("")
        
        // Bodgy Redux querying
        const data = userData.username
        const meallist = data.mealList
        
        // Iterate and find the meal we want
        let index = -1;
        for(let i = 0; i < meallist.length; i++){
            // console.log("EQCHECK", meallist[i].mealName, " ", meallist[i].date, date, )
            if(meallist[i].mealName  == originalMealName && ((new Date(meallist[i].date)).toString() === date.toString())){
                index = i
                // console.log("INDEXDUMP",index)
            }
        }
        
        // Makes sure a workoutlog can't be deleted unless exact match found
        data.mealList.splice(index, (index != -1) ? 1 : 0)
        
        // Add new meal
        // console.log("DATADUMP",mealData)
        meallist.push(mealData);
        
        // Save to Redux and DB
        axios.post('http://' + config.ipv4 + ':5000/user/updateMealList', {
            username: userData.username.username,
            mealList : data.mealList
        })
        .then(res => {
        // console.log("---------- POST Called to db")
        })
        .catch(e => {
            console.log("error", e)
        })
        
        dispatch(updateUsername(data))
    }

    const deleteMeal = () => {

        // Bodgy Redux querying
        const data = userData.username
        const meallist = data.mealList

        // Iterate and find the meal we want
        let index = -1;
        for(let i = 0; i < meallist.length; i++){
            if(meallist[i].mealName  == mealName && ((new Date(meallist[i].date)).toString() === date.toString())){
                index = i
            }
        }

        // Makes sure a workoutlog can't be deleted unless exact match found
        data.mealList.splice(index, (index != -1) ? 1 : 0)

        // Save to Redux and DB
        axios.post('http://' + config.ipv4 + ':5000/user/updateMealList', {
            username: userData.username.username,
            mealList : data.mealList
        })
        .then(res => {
        })
        .catch(e => {
            console.log("error", e)
        })

        dispatch(updateUsername(data))        
    }

    return (
        <View style={styles.container}>
            <View style={styles.progress}>

                <TouchableOpacity style={[styles.title_box, {marginTop: 10}]} onPress={toggleBottomNavigationView}>
                    <Text style={styles.title}>{actdate.toLocaleString('default',{month:'long'})} {actdate.getDate()}, {actdate.getFullYear()}</Text>
                </TouchableOpacity>

                <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
                    <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.secondary, }]}>
                    
                    <DateTimePicker style={{width: '90%', alignSelf: 'center', marginTop: '-10%', marginBottom: '-11%'}} themeVariant={themeReducer.theme ? "dark" : "light"} value={date} mode={'date'} onChange={onChange} display="inline"/>
                    <View style={{alignItems:'center', }}>
                    <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3",  }]} onPress={toggleBottomNavigationView}>
                        <Text style={styles.btn_text}>Done</Text>
                    </TouchableOpacity>
                    </View>

                    </View>
                </BottomSheet>

                <BottomSheet visible={detailMenuVisible} onBackButtonPress={toggleDetailMenu} onBackdropPress={toggleDetailMenu}>
                    <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.secondary, }]}>

                        <View style={styles.box}>
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Meal Name:</Text>
                                <TextInput
                                placeholder={mealName+""}
                                placeholderTextColor='grey'
                                returnKeyType={ 'done' }
                                style={styles.input_placeholder}
                                onChangeText={e => {setMealName(e)}}
                                value={mealName}
                                />
                            </View>

                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Fat (g):</Text>
                                <TextInput
                                placeholder={fatCount+""}
                                placeholderTextColor='grey'
                                returnKeyType={ 'done' }
                                style={styles.input_placeholder}
                                keyboardType="numeric"
                                onChangeText={e => {setFatCount(e); setCalorieCount((e * 9) + (proteinCount * 4) + (carbCount * 4));}}
                                value={fatCount}
                                />
                            </View>
                            
                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Protein (g):</Text>
                                <TextInput
                                style={styles.input_placeholder}
                                keyboardType="numeric"
                                placeholder={proteinCount+""}
                                returnKeyType={ 'done' }
                                placeholderTextColor='grey'
                                onChangeText={e => {setProteinCount(e); setCalorieCount((fatCount * 9) + (e * 4) + (carbCount * 4));}}
                                value={proteinCount}
                                />
                            </View>

                            <View style={styles.input_box}>
                                <Text style={styles.input_title}>Carbs (g):</Text>
                                <TextInput
                                style={styles.input_placeholder}
                                keyboardType="numeric"
                                returnKeyType={ 'done' }
                                placeholder={carbCount+""}
                                placeholderTextColor='grey'
                                onChangeText={e => {setCarbCount(e); setCalorieCount((fatCount * 9) + (proteinCount * 4) + (e * 4));}}
                                value={carbCount}
                                />
                            </View>

                            <View style={styles.title_box}>
                            <Text style={styles.title}>Total Calories: {calorieCount}</Text>
                            </View>
                            
                        </View>

                        {/* Button to add exercises */}
                        <View style={[styles.btn_box,]}>
                            <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "rgba(153,50,245,1)" }]} onPress={() => {updateMeal(); toggleDetailMenu();}}>
                            <Text style={styles.btn_text}>Update Meal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#800040" }]} onPress={() => {deleteMeal(); toggleDetailMenu();}}>
                            <Text style={styles.btn_text}>Delete Meal</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </BottomSheet>

                {/*
                <DateTimePicker style={{width: '90%', alignSelf: 'center', marginTop: '-10%', marginBottom: '-11%'}} themeVariant={"dark"} value={date} mode={'date'} onChange={(e, d) => console.log(e, d)} display="inline"/>
                <View style={{alignItems:'center', }}>
                <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3",  }]} onPress={() => console.log("hi")}>
                    <Text style={styles.btn_text}>Done</Text>
                </TouchableOpacity>
                </View>
                */}
            </View>
            <View style={styles.exercise_container}>


                <View
                    style={[
                        styles.title_box,
                        { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10, marginTop:-50 },
                    ]}
                >
                    <Text style={styles.title}>Meals</Text>
                </View>

                <ScrollView style={styles.box} horizontal={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>

                    
                    {/* {console.log("Rendering list")} */}
                    <View style={{flexGrow: 0, paddingTop: 8, alignItems: "center"}}>
                        {foodList}
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.btn_box, {marginTop: 40}]}>
                <TouchableOpacity
                    onPress={() => {
                        navi.navigate("Add Meal", {date: date});
                    }}
                    style={[styles.btn_shape, { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 }]}
                >
                    <Text style={[styles.btn_text]}>Add Meal</Text>
                </TouchableOpacity>
            </View>

        </View>
    
    );
}


export default Meals;