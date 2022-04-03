import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const CircleButton = props => (
    <TouchableOpacity
      style={{
        margin: props.margin,
        height: props.size,
        width: props.size,
        backgroundColor: props.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: props.size * 2,
      }}
      onPress={props.onPress}>
      <Text style={{color: props.textColor, fontSize: props.fontSize}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
  
const WorkoutLogDashboard = ({navigation}) => {

    return (
        <View style={{flex: 1, backgroundColor: '#f0f8ff'}}>
        <CircleButton
        text="Btn-4"
        size={80}
        color="#00bcd4"
        textColor="white"
        margin={10}
        fontSize={20}
      />

        <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#46ff7e" }]}
          onPress={() => navigation.navigate("AddExercise")}
        >
            <Text style={styles.btn_text}>Add Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn_shape, { backgroundColor: "#d446ff" }]}>
            <Text style={styles.btn_text}>placeholder2</Text>
        </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({
    formView:{
        flex: 1.5,
        backgroundColor: '#f0f8ff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        alignItems: "center"
    },
    inputView:{
        backgroundColor: "#71ebeb",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
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
})

export default WorkoutLogDashboard;