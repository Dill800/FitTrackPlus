import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import RadioGroup from 'react-native-radio-buttons-group';
import {Picker} from '@react-native-picker/picker';;

import { Macros } from './../components/styles'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';
import {useSelector, useDispatch} from 'react-redux'
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import { RadioButton } from 'react-native-paper';
import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MacroCalculator = ({navigation}) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();

    const styles = StyleSheet.create({
        container2: {
            flex: 1,
            paddingTop: 40,
            alignItems: "center"
        },
        
      container: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        flexDirection: "column",
        width: "95%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
      },
      input_box: {
        width: "75%",
        height: 65,
        marginBottom: 20,
      },
      input_box2: {
        width: "75%",
        height: 65,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
      },
      input_box3: {
        width: "75%",
        height: 65,
        marginBottom: 20,
        bottom: -10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      input_title: {
        color: theme.colors.text,
        fontSize: 18
      },
      input_title2: {
        color: theme.colors.text,
        fontSize: 18,
        marginTop: 40,
      },
      input_placeholder: {
        flex: 1,
        height: 40,
        marginTop: 0,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
      },
      btn_shape: {
        backgroundColor: "rgba(99,206,237,1)",
        borderRadius: 10,
        height: 40,
        width: 200,
        marginBottom: 15,
        justifyContent: "center",
        padding: 10
      },
      btn_text: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
      },
      box: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        width: "95%",
        height: 415,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
      },
      btns: {
        marginBottom: 20,
        alignItems: 'center',
        marginTop: 20,

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
      pickerAge: {
          marginTop: 40,
          width: 50,
          height: 120,
          alignSelf: 'center', 
          //backgroundColor: theme.colors.secondary,
          //color: theme.colors.card,
          marginLeft: 135,
          overflow: 'hidden',
          borderRadius: 10,
      },
      pickerAgeItem : {
          height: 120,
          width: 75,
          backgroundColor: theme.colors.sec,
          alignSelf: 'center', 
          borderRadius: 10,
          color: theme.colors.text,
          overflow: 'hidden',
      },
    pickerHeight: {
        width: 50,
        height: 120,
        alignSelf: 'center', 
        //backgroundColor: theme.colors.secondary,
        //color: theme.colors.card,
        marginLeft: 90,
        //overflow: 'hidden',
        //borderRadius: 10
    },
    pickerHeightItem : {
        height: 120,
        width: 70,
        //backgroundColor: theme.colors.sec,
        alignSelf: 'center', 
        //borderRadius: 10,
        color: theme.colors.text,
        //overflow: 'hidden',
    },
    pickerHeightInch: {
        width: 50,
        height: 120,
        alignSelf: 'center', 
       // backgroundColor: theme.colors.secondary,
        //color: theme.colors.card,
        //marginLeft: 10
        //left: -0.5,
        //overflow: 'hidden',
        //borderRadius: 10
        marginLeft: 6
    },
    pickerHeightInchItem : {
        height: 120,
        width: 75,
        //backgroundColor: theme.colors.sec,
        alignSelf: 'center', 
        //borderRadius: 10,
        //borderTopRightRadius: 10,
        //borderBottomRightRadius: 10,
        color: theme.colors.text,
        //overflow: 'hidden',
    },
    pickerActivity: {
        width: 200,
        height: 120,
        alignSelf: 'center', 
        //backgroundColor: theme.colors.secondary,
        //color: theme.colors.card,
        marginLeft: 30,
        marginRight: 3,
        overflow: 'hidden',
        borderRadius: 10
    },
    pickerActivityItem : {
        height: 120,
        width: 240,
        //backgroundColor: theme.colors.secondary,
        alignSelf: 'center', 
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        color: theme.colors.text,
        overflow: 'hidden',
        fontSize: 18,
    },
  });

   
    // const [fatCount, setFatCount] = useState(0);
    // const [proteinCount, setProteinCount] = useState(0);
    // const [carbCount, setCarbCount] = useState(0);
    // const [calorieCount, setCalorieCount] = useState(0);

    const [selectedAge, setSelectedAge] = useState('0');
    const [selectedGender, setSelectedGender] = React.useState('');
    const [selectedFoot, setSelectedFoot] = useState(0);
    const [selectedInch, setSelectedInch] = useState(0);
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(1);
    

    //setCalorieCount((fatCount * 9) + (proteinCount * 4) + (carbCount * 4));

    let totalActualCalories = 0;
    let proteinAmount = 0;
    let carbAmount = 0;
    let fatAmount = 0;

    const calculateMacros = () => { 
        // console.log("age", selectedAge);
        // console.log("gender", selectedGender);
        // console.log("ft", selectedFoot);
        // console.log("in", selectedInch);
        // console.log("lbs", selectedWeight);
        // console.log("act", selectedActivity);
        let totalCalories = 0;

        let kg = selectedWeight / 2.2046;
        //console.log("brock,", 12 * selectedFoot);
        let totalInches = (12 * selectedFoot) + selectedInch;
        let cm = totalInches * 2.54;
        let bmr = 0;
        // console.log("kg", kg);
        // console.log("cm", cm);
        if (selectedGender == "Male") {
            bmr = (10 * kg) + (6.25 * cm) - (5 * selectedAge) + 5;
            //console.log("breh", bmr);
        }
        else {
            bmr = (10 * kg) + (6.25 * cm) - (5 * selectedAge) - 161;
        }
        //console.log("bmr ", bmr);
        
        if (selectedActivity == 1) {
            totalCalories = bmr * 1.2;
        }
        else if (selectedActivity == 2) {
            totalCalories = bmr * 1.375;
        }
        else if (selectedActivity == 3) {
            totalCalories = bmr * 1.465;
        }
        else if (selectedActivity == 4) {
            totalCalories = bmr * 1.55;
        }
        else if (selectedActivity == 5) {
            totalCalories = bmr * 1.725;
        }
        else if (selectedActivity == 6) {
            totalCalories = bmr * 1.90;
        }
        totalCalories = Math.round(totalCalories);
        console.log(totalCalories);

        if (userData.username.currentWeight < userData.username.goalWeight) {
            totalCalories = totalCalories + 300;
        }
        else if (userData.username.currentWeight > userData.username.goalWeight) {
            totalCalories = totalCalories - 300;
        }
        console.log(totalCalories);

       proteinAmount = Math.round(selectedWeight);
       let remainderCalories = totalCalories - (proteinAmount * 4);
       carbAmount = Math.round((remainderCalories * .7) / 4);
       fatAmount  = Math.round((remainderCalories * .3) / 9);

       totalActualCalories = Math.round((proteinAmount * 4) + (carbAmount * 4) + (fatAmount * 9));
       console.log(totalActualCalories);
       console.log(fatAmount);
       console.log(proteinAmount);
       console.log(carbAmount);


        var data = qs.stringify({
          'username': userData.username.username,
          'calorieGoal': totalActualCalories,
          'goalFat': fatAmount,
          'goalProtein': proteinAmount,
          'goalCarb': carbAmount
        });
        var config2 = {
          method: 'post',
          url: 'http://' + config.ipv4 + ':5000/user/updateMacros',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };

        axios(config2)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          let data = userData.username;
          data.calorieGoal = totalActualCalories;
          data.goalFat = fatAmount;
          data.goalCarb = carbAmount;
          data.goalProtein = proteinAmount;
          dispatch(updateUsername(data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };



    let ageArray = [];
    let footArray = [];
    let inchArray = [];
    let activityArray = [];

    for (let i = 0; i < 101; i++) {
        let age = String(i);
        ageArray.push(
            <Picker.Item key= {i} label= {age} value={i} />
        )
    }

    for (let i = 0; i < 9; i++) {
        let foot = String(i);
        footArray.push(
            <Picker.Item key= {i} label= {foot + "'"} value={i} />
        )
    }

    for (let i = 0; i < 12; i++) {
        let inch = String(i);
        inchArray.push(
            <Picker.Item key= {i} label= {inch + "\""} value={i} />
        )
    }

    activityArray.push(<Picker.Item key= {1} label= {"Sendentary"} value={1} />);
    activityArray.push(<Picker.Item key= {2} label= {"Light"} value={2} />);
    activityArray.push(<Picker.Item key= {3} label= {"Moderate"} value={3} />);
    activityArray.push(<Picker.Item key= {4} label= {"Active"} value={4} />);
    activityArray.push(<Picker.Item key= {5} label= {"Very Active"} value={5} />);
    activityArray.push(<Picker.Item key= {6} label= {"Extra Active"} value={6} />);
    // let activityArray = [
    //     {value: "Sedentary: little or no exercse"},
    //     {value: "Light: exercise 1-3 times/week"},
    //     {value: "Moderate: exercise 4-5 times/week"},
    //     {value: "Active: daily exercise or intense exercise 3-4 times/week"},
    //     {value: "Very Active: intense exercise 6-7 times/week"},
    //     {value: "Extra Active: very intense exercise daily, or physical job"}
    // ];

    return (
        <HideKeyboard>
        {/* <ScrollView> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Macros>
          <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Macro Calculator</Text>
          <View style={styles.container}>
            <View style={styles.box}>
                <View style = {styles.input_box2}>
                    <Text style={styles.input_title2}>
                        Age
                    </Text>
                    <Picker
                            selectedValue={selectedAge}
                            style = {styles.pickerAge}
                            itemStyle = {styles.pickerAgeItem}
                            onValueChange={(itemValue, itemIndex) =>
                            setSelectedAge(itemValue)
                            }>
                            {ageArray}
                    </Picker>
                </View>

                <View style = {styles.input_box3}>
                    <Text style={styles.input_title}>
                        Gender
                    </Text>
                    <View style = {{flexDirection: 'row', padding:5, justifyContent:"space-between", alignItems: "center", marginLeft: 50}}>
                        <RadioButton.Android
                            value=""
                            uncheckedColor={theme.colors.text}
                            status={ selectedGender === 'Male' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setSelectedGender('Male');
                              console.log(selectedGender);
                            }}
                        />
                        <Text style={styles.input_title}>Male</Text>
                        <RadioButton.Android
                            value="Female"
                            uncheckedColor={theme.colors.text}
                            color='#eb28d7'
                            status={ selectedGender === 'Female' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setSelectedGender('Female');
                              console.log(selectedGender);
                            }}
                        />
                        <Text style={styles.input_title}>Female</Text>
                    </View>
                </View>

                <View style = {styles.input_box2}>
                    <Text style={styles.input_title}>
                        Height
                    </Text>
                    <View style= {{flexDirection: 'row', alignSelf:'center'}}>
                        <Picker
                                selectedValue={selectedFoot}
                                style = {styles.pickerHeight}
                                itemStyle = {styles.pickerHeightItem}
                                onValueChange={(itemValue, itemIndex) =>
                                setSelectedFoot(itemValue)
                                }>
                                {footArray}
                        </Picker>
                        <Picker
                                selectedValue={selectedInch}
                                style = {styles.pickerHeightInch}
                                itemStyle = {styles.pickerHeightInchItem}
                                onValueChange={(itemValue, itemIndex) =>
                                setSelectedInch(itemValue)
                                }>
                                {inchArray}
                        </Picker>
                    </View>
                </View>

                <View style = {styles.input_box2}>
                    <Text style={styles.input_title}>
                        Weight
                    </Text>
                    <View style = {{flexDirection: 'row', padding:5, justifyContent:"space-between", alignItems: "center", marginLeft: 60, marginRight: 55}}>
                        <TextInput
                        style={styles.input_placeholder}
                        keyboardType="numeric"
                        returnKeyType={ 'done' }
                        placeholder={"Enter in lbs"}
                        placeholderTextColor='grey'
                        onChangeText={e => {
                          setSelectedWeight(e);
                          //console.log(selectedWeight);
                        }}
                        value={selectedWeight}
                        />
                    </View>
                </View>

                <View style = {styles.input_box2}>
                    <Text style={styles.input_title}>
                        Activity
                    </Text>
                    <View style= {{flexDirection: 'row', alignSelf:'center'}}>
                        <Picker
                                selectedValue={selectedActivity}
                                style = {styles.pickerActivity}
                                itemStyle = {styles.pickerActivityItem}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedActivity(itemValue); 
                                    //console.log(selectedActivity);
                                  }}>
                                {activityArray}
                        </Picker>
                </View>
                </View>

              </View>

              {/* BOTTOM BUTTONS */}
              {/* onPress={() => this.addActivity()} */}
              <View style={styles.btns}>
                <TouchableOpacity
                    onPress={() => {
                      calculateMacros();
                      Alert.alert("To reach " + userData.username.goalWeight + " lbs:\nTotal Calories: " + totalActualCalories + "\nFat: " + fatAmount + " g\nProtein: " + proteinAmount + " g\nCarb: " + carbAmount + " g");
                      navigation.navigate("Macros");
                    }}
                    style={styles.btn_shape}
                >
                    <Text style={styles.btn_text}>Calculate</Text>
                </TouchableOpacity>
                

                
              </View>
            </View>
          </Macros>
        </View>
        {/* </ScrollView> */}
        </HideKeyboard>
    );
}

export default MacroCalculator;

