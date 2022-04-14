import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'

import { Macros } from './../components/styles'
import { UPDATE_USERNAME } from "../redux/actions/user";
import { updateUsername } from '../redux/actions/user';
import {useSelector, useDispatch} from 'react-redux'

import axios from 'axios'
import qs from 'qs'
import config from '../backend/config/config.js'

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ManualMeal = ({navigation}) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();

    const styles = StyleSheet.create({
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
  });

    const [name, setName] = useState('');
    const [numSets, setNumSets] = useState('');
    const [numReps, setNumReps] = useState('');
    const [fatCount, setFatCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [calorieCount, setCalorieCount] = useState(0);
    const [mealName, setMealName] = useState()

    //setCalorieCount((fatCount * 9) + (proteinCount * 4) + (carbCount * 4));

    const updateMeals = () => {
        var data = qs.stringify({
          'username': userData.username.username,
          'meal': {
              'date': Date.now(),
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
          let data = userData.username;

          data.mealList.push({
            'date': Date.now(),
            'mealName': mealName,
            'fat': fatCount,
            'protein': proteinCount,
            'carbs': carbCount,
            'calories': calorieCount
          })

          dispatch(updateUsername(data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };

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
                    <Text style={styles.btn_text}>Save Changes</Text>
                </TouchableOpacity>
                

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Meals")
                        console.log(userData.username)
                    }}
                    style={[styles.btn_shape, { backgroundColor: "red" }]}
                >
                    <Text style={styles.btn_text}>Back to Meals</Text>
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