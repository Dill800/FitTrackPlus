import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer, useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const ForumNavigator = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='ForumHome'>
        <Stack.Screen name='ForumHome' options={{headerShown: false, gestureEnabled: true}} component={ForumHome}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ForumHome = ({navigation}) => {
  return (
    <View style={styles.container}>

        <View style={styles.exercise_container}>
          <View
            style={[
              styles.title_box,
              { backgroundColor: "#66059e", marginVertical: 10 },
            ]}
          >
            <Text style={styles.title}>All Forum Posts</Text>
          </View>

          <ScrollView horizontal={false} style={styles.box}>
            <Text>Bottom Text</Text>
          </ScrollView>

        </View>
    </View>
);
}

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
    backgroundColor: "rgba(213,218,223,1)",
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
})

export default ForumNavigator;