import React, {useState, useEffect} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'

import { Macros } from './../components/styles'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';
import {useSelector, useDispatch} from 'react-redux'

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'
import { InputLeftAddon } from 'native-base';

const fetch = require("node-fetch");

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ManualMeal = ({route, navigation}) => {

    console.log(route.params.date)
    console.log(typeof(route.params.date))
    console.log("brock", new Date(route.params.date))

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
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: theme.colors.text,
        marginHorizontal: 100
      },
      container: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        flexDirection: "column",
        width: "95%",
        justifyContent: "center",
        alignItems: "center"
      },
      input_box: {
        width: "75%",
        height: 65,
        marginBottom: 20,
      },
      input_title: {
        color: theme.colors.text,
      },
      input_placeholder: {
        flex: 1,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: theme.colors.secondary,
        color: theme.colors.text,
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
      inputView: {
        flexDirection: 'row',
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        marginHorizontal: 50,
        alignItems: "center",
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
      brock_button: {
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
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
  });

    const [fatCount, setFatCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [calorieCount, setCalorieCount] = useState(0);
    const [mealName, setMealName] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [getFoodSearch, setFoodSearch] = useState('');
    const [getPortion, setPortion] = useState('');

    //setCalorieCount((fatCount * 9) + (proteinCount * 4) + (carbCount * 4));
    
    const updateMeals = () => {
        let d = Date.now();
        let goodDate = new Date(route.params.date);
        goodDate.setHours(goodDate.getHours());
        var data = qs.stringify({
          'username': userData.username.username,
          'meal': {
              'date': goodDate,
              'mealName': mealName,
              'fat': fatCount,
              'protein': proteinCount,
              'carbs': carbCount,
              'calories': calorieCount
          }
        });
        var config2 = {
          method: 'post',
          url: 'http://' + config.ipv4 + ':5000/user/addMeal',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };

        axios(config2)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          let goodDate = new Date(route.params.date);
          goodDate.setHours(goodDate.getHours());
          let data = userData.username;
          data.mealList.push({
            'date': goodDate,
            'mealName': mealName,
            'fat': fatCount,
            'protein': proteinCount,
            'carbs': carbCount,
            'calories': calorieCount
          })

          dispatch(updateUsername(data));
          console.log("Good date", new Date(route.params.date));
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const findFood = () => {
        const params = {
            api_key: 'gX9n2yNedDJtAGoQyF34t86M1gN63LjTuLFeDccy',
            query: getFoodSearch,
            dataType: ["Foundation","Survey (FNDDS)"],
            pagesize: 1,
            requireAllWords: true
        }

        const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}&requireAllWords=${encodeURIComponent(params.requireAllWords)}`
        function getData() {
          return fetch(api_url)
          .then(response => response.json())
        }
        
        getData().then(data => {
          let proteinLog = {};
          let carbLog = {};
          let fatLog = {};
          let calorieLog = {};
          for (let i = 0; i < data.foods[0].foodNutrients.length; i++) {
              let nutrientName = data.foods[0].foodNutrients[i].nutrientName;
              if (nutrientName.substring(0,6) == "Energy") {
                  calorieLog =  data.foods[0].foodNutrients[i];
              }
              else if (nutrientName.substring(0,7) == "Protein") {
                  proteinLog = data.foods[0].foodNutrients[i];
              }
              else if (nutrientName.substring(0,12) == "Carbohydrate") {
                  carbLog = data.foods[0].foodNutrients[i];
              }
              else if (nutrientName.substring(0,11) == "Total lipid") {
                  fatLog = data.foods[0].foodNutrients[i];
              }
              
          }

          // let proteinLog = data.foods[0].foodNutrients[0];
          // let fatLog = data.foods[0].foodNutrients[1];
          // let carbLog = data.foods[0].foodNutrients[2];
          // let calorieLog = data.foods[0].foodNutrients[3];

          console.log(data.foods[0]);
          console.log(proteinLog);
          console.log(carbLog);
          console.log(fatLog);
          console.log(calorieLog);
          console.log(typeof(proteinLog));



          let proteinContent = proteinLog.value * (getPortion / 100);
          let carbContent = carbLog.value * (getPortion / 100);
          let fatContent = fatLog.value * (getPortion / 100);
          let calorieContent = calorieLog.value * (getPortion / 100);
          let myCalorieContent = Math.round((proteinContent * 4) + (carbContent * 4) + (fatContent * 9));
          
          if (getPortion == 0) {
            let portion100 = 100;
            proteinContent = proteinLog.value * (portion100 / 100);
            carbContent = carbLog.value * (portion100 / 100);
            fatContent = fatLog.value * (portion100 / 100);
            calorieContent = calorieLog.value * (portion100 / 100);
            myCalorieContent = Math.round((proteinContent * 4) + (carbContent * 4) + (fatContent * 9));
          } 

          console.log(data.foods[0].description)
          console.log("protein", proteinContent);
          console.log("carb", carbContent);
          console.log("fat", fatContent);
          console.log("calorie", calorieContent);

          setProteinCount(String(Math.round(proteinContent)));
          setCarbCount(String(Math.round(carbContent)));
          setFatCount(String(Math.round(fatContent)));
          setCalorieCount(myCalorieContent);
          setMealName(getFoodSearch);

          console.log("My calorie: " + myCalorieContent);
        })

        // function getData() {
        //   return fetch(api_url)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.foods[0].foodNutrients));
        //   })
        // }

    }

    return (
        <HideKeyboard>
        <ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Macros>
          <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Add Meal</Text>
          <View style={styles.container}>
            <View style={styles.box}>

             <View style={styles.input_box}>
                  <Text style={styles.input_title}>Meal Name:</Text>
                  <TextInput
                  placeholder={"Enter Meal Name"}
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
                  placeholder={"0"}
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
                  placeholder={"0"}
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
                      updateMeals();
                      setCalorieCount(0);
                      setFatCount(0);
                      setProteinCount(0);
                      setCarbCount(0);
                      setMealName('')
                      navigation.navigate("Meals");
                    }}
                    style={styles.btn_shape}
                >
                    <Text style={styles.btn_text}>Add Meal</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                          <Text style={[styles.modalText, ]}>Enter Food Data</Text>
                          <View style={[styles.inputView, { flexDirection: 'column', height: 100, width: '100%', marginBottom: 0 }]}>
                          <Text style={[styles.input_title, {marginRight: 210, marginBottom: 10, textAlign: 'left'}]}>Food:</Text>
                            <TextInput
                              
                              style={[styles.input,{ flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 20, width: 250 }]}
                              placeholder='Name of Food'
                              placeholderTextColor='grey'
                              onChangeText={e => setFoodSearch(e)}
                              value={getFoodSearch}
                            />
                            <Text style={[styles.input_title, {marginRight: 175, marginBottom: 10}]}>Portion (g):</Text>
                            <TextInput
                              style={[styles.input,
                              { flex: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, marginBottom: 10, width: 250 }]}
                              placeholder='Default: 100g'
                              placeholderTextColor='grey'
                              keyboardType="numeric"
                              onChangeText={e => setPortion(e)}
                              value={getPortion}
                            />
                            


                            <TouchableOpacity
                              style={[styles.button, styles.buttonClose, { marginTop: 30, width:150 }]}
                              onPress={() => {
                                findFood();
                                setModalVisible(false);
                                setPortion('');
                                setFoodSearch('');                              }}
                            >
                              <Text style={styles.textStyle}>Search</Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose, {marginTop: 160}]}
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={styles.textStyle}>Return</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </Modal>
                
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true)
                        //console.log(userData.username)
                    }}
                    style={[styles.btn_shape, { backgroundColor: "purple" }]}
                >
                    <Text style={styles.btn_text}>Search Foods ????</Text>
                </TouchableOpacity>

              

              </View>
            </View>
          </Macros>
        </View>
        </ScrollView>
        </HideKeyboard>
    );
}

export default ManualMeal;