import React, {useRef, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import { TouchableWithoutFeedback, Modal,Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useDrawerStatus } from "@react-navigation/drawer";
import {useSelector, useDispatch} from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';

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

    const [date, setDate] = useState(new Date(Date.now()))
    const [visible, setVisible] = useState(false);
    const [actdate, setActdate] = useState(new Date(Date.now()))

    const themeReducer = useSelector(({ themeReducer }) => themeReducer);

    const [sid, setSid] = useState(0)

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
      };

      const onChange = (event, selectedDate) => {
          let d = new Date();
          d.setHours(d.getHours() - 4);
        console.log("oogd", d)
        const currentDate = new Date(selectedDate);
        setDate(new Date(selectedDate));
        currentDate.setDate(currentDate.getDate())
        setActdate(currentDate)

        
        console.log(currentDate)
      };

    const changeDate = () => {

        console.log(date)
        setSid(sid+1)

    }

    console.log("About to run for loop, list length: ", userData.username.mealList.length)
    for(let i = 0; i < userData.username.mealList.length; i++) {
        let x = new Date(userData.username.mealList[i].date)

        if(x.getDate() === actdate.getDate() && x.getMonth() === actdate.getMonth() && x.getFullYear() === actdate.getFullYear())
        foodList.push(
            <View
            key = {i}
            style={{
            alignItems: "center",
            width: 370,
            height: 'auto',
            marginBottom: 15
        }}
    >
        <View
            key = {i}
            style={{
                backgroundColor: theme.colors.secondary,
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: 'auto',
                //alignItems: 'center',
            }}
        >
            <Text style={{ color: theme.colors.text, fontSize: 25, fontWeight: "bold" }}>{userData.username.mealList[i].mealName}</Text>
            <Text style={[styles.card_text, {color: 'tomato', fontWeight: 'bold'}]}>Calorie:                       {userData.username.mealList[i].calories}</Text>
            <Text style={[styles.card_text, {color: 'skyblue', fontWeight: 'bold'}]}>Fat:                               {userData.username.mealList[i].fat} g</Text>
            <Text style={[styles.card_text, {color: 'gold', fontWeight: 'bold'}]}>Protein:                       {userData.username.mealList[i].protein} g</Text>
            <Text style={[styles.card_text, {color: 'forestgreen', fontWeight: 'bold'}]}>Carb:                            {userData.username.mealList[i].carbs} g</Text>
        </View>
    </View>
        )
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
                    <View style={{flexGrow: 0, paddingTop: 8}}>
                        {foodList}
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.btn_box, {marginTop: 40}]}>
                <TouchableOpacity
                    onPress={() => {
                        navi.navigate("Add Meal");
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