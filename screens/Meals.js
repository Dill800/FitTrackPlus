import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { TouchableWithoutFeedback, Modal, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDrawerStatus } from "@react-navigation/drawer";
import { useSelector, useDispatch } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';

import { updateUsername } from '../redux/actions/user';
import axios from 'axios'
import config from '../backend/config/config.js'
import dateformat from "dateformat";
import { InputLeftAddon } from 'native-base';

const Meals = ({ navigation }) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();


    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            margin: 20,
            width: "90%",
            backgroundColor: theme.colors.background,
            borderRadius: 20,
            paddingVertical: 100,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        input: {
            flex: 1,
            height: 40,
            paddingHorizontal: 20,
            borderRadius: 15,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
        },
        modalText: {
            //marginBottom: 15,
            //textAlign: "center",
            fontSize: 20,
            color: theme.colors.text,
            //marginHorizontal: 100
        },
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

    // let adjustedDate = new Date(Date.now());
    // adjustedDate.setHours(adjustedDate.getHours() - 4)

    const [date, setDate] = useState(new Date())

    const [visible, setVisible] = useState(false);
    const [detailMenuVisible, setDetailMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [actdate, setActdate] = useState(new Date());

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

        //console.log("dillon", currentDate)
    };

    const changeDate = () => {
        console.log(date)
        setSid(sid + 1)
    }

    // console.log(new Date(Date.now()))
    // console.log("ryan", actdate);
    // console.log("TODAY:", dateformat(new Date(Date.now()), 'mmmm dd, yyyy'))
    // console.log("ACTDATE", dateformat(actdate, 'mmmm dd, yyyy'))

    for (let i = 0; i < userData.username.mealList.length; i++) {
        let x = new Date(userData.username.mealList[i].date)

        if (x.getDate() === actdate.getDate() && x.getMonth() === actdate.getMonth() && x.getFullYear() === actdate.getFullYear())

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
                    setModalVisible(true);
                }}>
                    <View key={i} style={{ alignItems: "center", width: 370, height: 'auto', marginBottom: 15 }}>
                        <View key={i} style={{ backgroundColor: theme.colors.secondary, borderRadius: 15, padding: 15, width: "90%", }}>
                            <Text style={{ color: theme.colors.text, fontSize: 25, fontWeight: "bold" }}>{userData.username.mealList[i].mealName}</Text>
                            <Text style={[styles.card_text, { color: 'tomato', fontWeight: 'bold' }]}>Calorie:                       {userData.username.mealList[i].calories}</Text>
                            <Text style={[styles.card_text, { color: 'skyblue', fontWeight: 'bold' }]}>Fat:                               {userData.username.mealList[i].fat} g</Text>
                            <Text style={[styles.card_text, { color: 'gold', fontWeight: 'bold' }]}>Protein:                       {userData.username.mealList[i].protein} g</Text>
                            <Text style={[styles.card_text, { color: 'forestgreen', fontWeight: 'bold' }]}>Carb:                            {userData.username.mealList[i].carbs} g</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }

    // Update meal to Redux and DB when form is completed
    const updateMeal = () => {

        if (fatCount == '' || proteinCount == '' || carbCount == '' || calorieCount == '' || mealName == '') {
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
        for (let i = 0; i < meallist.length; i++) {
            // console.log("EQCHECK", meallist[i].mealName, " ", meallist[i].date, date, )
            if (meallist[i].mealName == originalMealName && ((new Date(meallist[i].date)).toString() === date.toString())) {
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
            mealList: data.mealList
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
        for (let i = 0; i < meallist.length; i++) {
            if (meallist[i].mealName == mealName && ((new Date(meallist[i].date)).toString() === date.toString())) {
                index = i
            }
        }

        // Makes sure a workoutlog can't be deleted unless exact match found
        data.mealList.splice(index, (index != -1) ? 1 : 0)

        // Save to Redux and DB
        axios.post('http://' + config.ipv4 + ':5000/user/updateMealList', {
            username: userData.username.username,
            mealList: data.mealList
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

                <TouchableOpacity style={[styles.title_box, { marginTop: 10 }]} onPress={toggleBottomNavigationView}>
                    <Text style={styles.title}>{actdate.toLocaleString('default', { month: 'long' })} {actdate.getDate()}, {actdate.getFullYear()}</Text>
                </TouchableOpacity>

                <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
                    <View style={[styles.bottomNavigationView, { backgroundColor: theme.colors.secondary, }]}>

                        <DateTimePicker style={{ width: '90%', alignSelf: 'center', marginTop: '-10%', marginBottom: '-11%' }} themeVariant={themeReducer.theme ? "dark" : "light"} value={date} mode={'date'} onChange={onChange} display="inline" />
                        <View style={{ alignItems: 'center', }}>
                            <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#3551f3", }]} onPress={toggleBottomNavigationView}>
                                <Text style={styles.btn_text}>Done</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </BottomSheet>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={[styles.centeredView]}>

                        {/* <View style={styles.box}> */}
                        <View style={styles.modalView}>
                            <Text style={[styles.modalText, { marginBottom: 20 }]}>Edit Food Data</Text>
                            <Text style={[styles.input_title, { marginRight: 220, marginBottom: 10, }]}>Meal Name:</Text>
                            <TextInput
                                style={[styles.input, { flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 10, width: "80%" }]}
                                placeholder={mealName + ""}
                                placeholderTextColor='grey'
                                returnKeyType={'done'}
                                //style={styles.input_placeholder}
                                onChangeText={e => { setMealName(e) }}
                                value={mealName}
                            />
                            <Text style={[styles.input_title, { marginRight: 250, marginBottom: 10 }]}>Fat (g):</Text>
                            <TextInput
                                style={[styles.input,
                                { flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 10, width: "80%" }]}
                                placeholder={fatCount + ""}
                                placeholderTextColor='grey'
                                returnKeyType={'done'}
                                //style={styles.input_placeholder}
                                keyboardType="numeric"
                                onChangeText={e => { setFatCount(e); setCalorieCount((e * 9) + (proteinCount * 4) + (carbCount * 4)); }}
                                value={fatCount}
                            />
                            <Text style={[styles.input_title, { marginRight: 225, marginBottom: 10 }]}>Protein (g):</Text>
                            <TextInput
                                style={[styles.input, { flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 20, width: "80%" }]}
                                keyboardType="numeric"
                                placeholder={proteinCount + ""}
                                returnKeyType={'done'}
                                placeholderTextColor='grey'
                                onChangeText={e => { setProteinCount(e); setCalorieCount((fatCount * 9) + (e * 4) + (carbCount * 4)); }}
                                value={proteinCount}
                            />
                            <Text style={[styles.input_title, { marginRight: 230, marginBottom: 10 }]}>Carbs (g):</Text>
                            <TextInput
                                style={[styles.input, { flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 20, width: "80%" }]}
                                keyboardType="numeric"
                                returnKeyType={'done'}
                                placeholder={carbCount + ""}
                                placeholderTextColor='grey'
                                onChangeText={e => { setCarbCount(e); setCalorieCount((fatCount * 9) + (proteinCount * 4) + (e * 4)); }}
                                value={carbCount}
                            />
                            <View style={[styles.title_box, { marginTop: 10, marginBottom: 30 }]}>
                                <Text style={[styles.title,]}>Total Calories: {calorieCount}</Text>
                            </View>
                            {/* Button to add exercises */}
                            <View style={[styles.btn_box,]}>
                                <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 }]} onPress={() => { updateMeal(); setModalVisible(false); }}>
                                    <Text style={styles.btn_text}>Update Meal</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#800040", marginHorizontal: 10 }]} onPress={() => { deleteMeal(); setModalVisible(false); }}>
                                    <Text style={styles.btn_text}>Delete Meal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>








                        {/* </View> */}



                    </View>
                </Modal>


            </View>
            <View style={styles.exercise_container}>


                <View
                    style={[
                        styles.title_box,
                        { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10, marginTop: -50 },
                    ]}
                >
                    <Text style={styles.title}>Meals</Text>
                </View>

                <ScrollView style={styles.box} horizontal={false}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>


                    {/* {console.log("Rendering list")} */}
                    <View style={{ flexGrow: 0, paddingTop: 8 }}>
                        {foodList}
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.btn_box, { marginTop: 40 }]}>
                <TouchableOpacity
                    onPress={() => {
                        navi.navigate("Add Meal", { date: date });
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