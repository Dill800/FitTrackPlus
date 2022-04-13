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
      input_title: {
        color: theme.colors.text,
        fontSize: 18
      },
      input_placeholder: {
        flex: 1,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: theme.colors.secondary,
        color: theme.colors.text,
        textAlign: 'center'
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
        height: 400,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
      },
      btns: {
        marginBottom: 20,
        alignItems: 'center',

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
          width: 75,
          height: 40,
          alignSelf: 'center', 
          backgroundColor: theme.colors.sec,
          color: theme.colors.card,
          marginLeft: 130
      },
      pickerAgeItem : {
          height: 40,
          width: 75,
          backgroundColor: theme.colors.secondary,
          alignSelf: 'center', 
          borderRadius: 10,
          color: theme.colors.text
      },
    pickerHeight: {
        width: 70,
        height: 40,
        alignSelf: 'center', 
        backgroundColor: theme.colors.sec,
        color: theme.colors.card,
        marginLeft: 75,
        overflow: 'hidden',
    },
    pickerHeightItem : {
        height: 40,
        width: 60,
        backgroundColor: theme.colors.secondary,
        alignSelf: 'center', 
        borderRadius: 10,
        color: theme.colors.text,
        overflow: 'hidden',
    },
    pickerHeightInch: {
        width: 70,
        height: 40,
        alignSelf: 'center', 
        backgroundColor: theme.colors.sec,
        color: theme.colors.card,
        //marginLeft: 10
        left: -20,
        //overflow: 'hidden',
    },
    pickerHeightInchItem : {
        height: 40,
        width: 75,
        backgroundColor: theme.colors.secondary,
        alignSelf: 'center', 
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        color: theme.colors.text,
        overflow: 'hidden',
    }
  });

    const [name, setName] = useState('');
    const [numSets, setNumSets] = useState('');
    const [numReps, setNumReps] = useState('');
    const [fatCount, setFatCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [calorieCount, setCalorieCount] = useState(0);

    //setCalorieCount((fatCount * 9) + (proteinCount * 4) + (carbCount * 4));

    const updateMacros = () => {
        var data = qs.stringify({
          'username': userData.username.username,
          'calorieGoal': calorieCount,
          'goalFat': fatCount,
          'goalProtein': proteinCount,
          'goalCarb': carbCount
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
          data.calorieGoal = calorieCount;
          data.goalFat = fatCount;
          data.goalCarb = carbCount;
          data.goalProtein = proteinCount;
          dispatch(updateUsername(data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const [selectedAge, setSelectedAge] = useState('18');
    const [checked, setChecked] = React.useState('');
    const [selectedFoot, setSelectedFoot] = useState('5');
    const [selectedInch, setSelectedInch] = useState('5');
    const [getWeight, setWeight] = useState('');


    let ageArray = [];
    let footArray = [];
    let inchArray = [];

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

    return (
        <HideKeyboard>
        <ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Macros>
          <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Macro Calculator</Text>
          <View style={styles.container}>
            <View style={styles.box}>
                <View style = {styles.input_box2}>
                    <Text style={styles.input_title}>
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

                <View style = {styles.input_box2}>
                    <Text style={styles.input_title}>
                        Gender
                    </Text>
                    <View style = {{flexDirection: 'row', padding:5, justifyContent:"space-between", alignItems: "center", marginLeft: 50}}>
                        <RadioButton.Android
                            value=""
                            uncheckedColor={theme.colors.text}
                            status={ checked === 'Male' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Male')}
                        />
                        <Text style={styles.input_title}>Male</Text>
                        <RadioButton.Android
                            value="Female"
                            uncheckedColor={theme.colors.text}
                            color='#eb28d7'
                            status={ checked === 'Female' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Female')}
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
                    <View style = {{flexDirection: 'row', padding:5, justifyContent:"space-between", alignItems: "center", marginLeft: 60, marginRight: 60}}>
                        <TextInput
                        style={styles.input_placeholder}
                        keyboardType="numeric"
                        returnKeyType={ 'done' }
                        placeholder={"0"}
                        placeholderTextColor='grey'
                        onChangeText={e => setWeight(e)}
                        value={getWeight}
                        />
                    </View>
                </View>


              <View style={styles.input_box}>
                  <Text style={styles.input_title}>Target Carbs (g):</Text>
                  <TextInput
                  style={styles.input_placeholder}
                  keyboardType="numeric"
                  returnKeyType={ 'done' }
                  placeholder={"0"}
                  placeholderTextColor='grey'
                  onChangeText={e => {setCarbCount(e); setCalorieCount((fatCount * 9) + (proteinCount * 4) + (e * 4));}}
                  value={carbCount}
                  />
              </View>
                  <View style={styles.title_box}>
                    <Text style={styles.title}>Total Calories: {calorieCount}</Text>
                  </View>
              </View>

              {/* BOTTOM BUTTONS */}
              {/* onPress={() => this.addActivity()} */}
              <View style={styles.btns}>
                <TouchableOpacity
                    onPress={() => {
                      updateMacros();
                      Alert.alert("Successfully updated macros goals!")
                      setCalorieCount(0);
                      setFatCount(0);
                      setProteinCount(0);
                      setCarbCount(0);
                      navigation.navigate("Macros");
                    }}
                    style={styles.btn_shape}
                >
                    <Text style={styles.btn_text}>Calculate</Text>
                </TouchableOpacity>
                

                <TouchableOpacity
                    onPress={() => navigation.navigate("Macros")}
                    style={[styles.btn_shape, { backgroundColor: "red" }]}
                >
                    <Text style={styles.btn_text}>Back to Macros</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Macros>
        </View>
        </ScrollView>
        </HideKeyboard>
    );
}

export default MacroCalculator;

