import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    input_box: {
      width: "75%",
      height: 40,
      marginBottom: 25,
    },
    input_title: {
      color: "#121212",
      marginTop: -20,
    },
    input_placeholder: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      color: "#121212",
      backgroundColor: "rgba(230,230,230,1)",
    },
    btn_shape: {
      backgroundColor: "rgba(99,206,237,1)",
      borderRadius: 10,
      width: "40%",
      height: 40,
      marginBottom: 15,
      justifyContent: "center",
    },
    btn_text: {
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "bold",
    },
});

const AddExercise = ({navigation}) => {

    const [name, setName] = useState('');
    const [numSets, setNumSets] = useState('');
    const [numReps, setNumReps] = useState('');

    return (
        <HideKeyboard>
        <View style={styles.container}>

            <View style={styles.input_box}>
                <Text style={styles.input_title}>Exercise Name</Text>
                <TextInput
                placeholder={"Exercise Name"}
                style={styles.input_placeholder}
                value={name + ""}
                onChangeText={e => setName(e)}
                />
            </View>

            <View style={styles.input_box}>
                <Text style={styles.input_title}>Num Sets</Text>
                <TextInput
                placeholder={"0"}
                style={styles.input_placeholder}
                value={numSets + ""}
                onChangeText={e => setNumSets(e)}
                />
            </View>
            
            <View style={styles.input_box}>
                <Text style={styles.input_title}>Num Reps</Text>
                <TextInput
                style={styles.input_placeholder}
                value={numReps+ ""}
                placeholder={"0"}
                onChangeText={e => setNumReps(e)}
                />
            </View>


            {/* BOTTOM BUTTONS */}
            {/* onPress={() => this.addActivity()} */}
            <TouchableOpacity
                onPress={() => navigation.navigate("WorkoutLog")}
                style={styles.btn_shape}
            >
                <Text style={styles.btn_text}>Finish Adding Exercise</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("WorkoutLog")}
                style={[styles.btn_shape, { backgroundColor: "red" }]}
            >
                <Text style={styles.btn_text}>Back to WorkoutLog</Text>
            </TouchableOpacity>

        </View>
        </HideKeyboard>
    );
}

export default AddExercise;