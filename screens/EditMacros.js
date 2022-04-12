import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'

import { Macros } from './../components/styles'


const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditMacros = ({navigation}) => {

    const theme = useTheme();

    const styles = StyleSheet.create({
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

      }
  });

    const [name, setName] = useState('');
    const [numSets, setNumSets] = useState('');
    const [numReps, setNumReps] = useState('');

    return (
        <HideKeyboard>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Macros>
          <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Edit Macros</Text>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.input_box}>
                  <Text style={styles.input_title}>Target Calories:</Text>
                  <TextInput
                  placeholder={"0"}
                  placeholderTextColor='grey'
                  style={styles.input_placeholder}
                  value={name + ""}
                  keyboardType="numeric"
                  returnKeyType={ 'done' }
                  onChangeText={e => setName(e)}
                  />
              </View>

              <View style={styles.input_box}>
                  <Text style={styles.input_title}>Target Fat:</Text>
                  <TextInput
                  placeholder={"0"}
                  placeholderTextColor='grey'
                  returnKeyType={ 'done' }
                  style={styles.input_placeholder}
                  value={numSets + ""}
                  keyboardType="numeric"
                  onChangeText={e => setNumSets(e)}
                  />
              </View>
              
              <View style={styles.input_box}>
                  <Text style={styles.input_title}>Target Protein:</Text>
                  <TextInput
                  style={styles.input_placeholder}
                  value={numReps+ ""}
                  keyboardType="numeric"
                  placeholder={"0"}
                  returnKeyType={ 'done' }
                  placeholderTextColor='grey'
                  onChangeText={e => setNumReps(e)}
                  />
              </View>

              <View style={styles.input_box}>
                  <Text style={styles.input_title}>Target Carbs:</Text>
                  <TextInput
                  style={styles.input_placeholder}
                  value={numReps+ ""}
                  keyboardType="numeric"
                  returnKeyType={ 'done' }
                  placeholder={"0"}
                  placeholderTextColor='grey'
                  onChangeText={e => setNumReps(e)}
                  />
              </View>
              </View>

              {/* BOTTOM BUTTONS */}
              {/* onPress={() => this.addActivity()} */}
              <View style={styles.btns}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Macros")}
                    style={styles.btn_shape}
                >
                    <Text style={styles.btn_text}>Save Changes</Text>
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
        </HideKeyboard>
    );
}

export default EditMacros;