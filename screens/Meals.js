import * as React from "react";

import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {NavigationContainer, useNavigation } from '@react-navigation/native'


const Meals = ({navigation}) => {
    const navi = useNavigation();
    let foodList = [];
    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 125,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >
        <View
            style={{
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: "95%",
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Pizza</Text>
            <Text>{"Calories: 103"}</Text>
            <Text>{"Fat: 386"}</Text>
            <Text>{"Protein: 38 grams"}</Text>
            <Text>{"Carb: 38 grams "}</Text>
            <Image
                source={require('../assets/pizza.png')}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                    width: 100,
                    height: 100,
                }}
            />
        </View>
    </View>)
    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 125,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >
        <View
            style={{
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: "95%",
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Pasta</Text>
            <Text>{"Calories: 103"}</Text>
            <Text>{"Fat: 386"}</Text>
            <Text>{"Protein: 38 grams"}</Text>
            <Text>{"Carb: 38 grams "}</Text>
            <Image
                source={require('../assets/pasta.png')}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                    width: 100,
                    height: 100,
                }}
            />
        </View>
    </View>)
    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 125,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >
        <View
            style={{
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: "95%",
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Cupcake</Text>
            <Text>{"Calories: 103"}</Text>
            <Text>{"Fat: 38 grams"}</Text>
            <Text>{"Protein: 38 grams"}</Text>
            <Text>{"Carb: 38 grams "}</Text>
            <Image
                source={require('../assets/cupcake.png')}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                    width: 100,
                    height: 100,
                }}
            />
        </View>
    </View>)
    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 125,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >
        <View
            style={{
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: "95%",
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Pudding</Text>
            <Text>{"Calories: 103"}</Text>
            <Text>{"Fat: 386"}</Text>
            <Text>{"Protein: 38 grams"}</Text>
            <Text>{"Carb: 38 grams "}</Text>
            <Image
                source={require('../assets/pudding.png')}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                    width: 100,
                    height: 100,
                }}
            />
        </View>
    </View>)
    foodList.push(<View
        style={{
            alignItems: "center",
            width: 340,
            height: 125,
            paddingTop: 8,
            marginBottom: 15,
        }}
    >
        <View
            style={{
                backgroundColor: "rgba(230,230,230,1)",
                borderRadius: 15,
                padding: 15,
                width: "95%",
                height: "95%",
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Greek Yogurt</Text>
            <Text>{"Calories: 103"}</Text>
            <Text>{"Fat: 386"}</Text>
            <Text>{"Protein: 38 grams"}</Text>
            <Text>{"Carb: 38 grams "}</Text>
            <Image
                source={require('../assets/greekYogurt.png')}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                    width: 100,
                    height: 100,
                }}
            />
        </View>
    </View>);

    return (
        <View style={styles.container}>
            <View style={styles.progress}>
                <View style={styles.title_box}>
                    <Text style={styles.title}>Today</Text>
                </View>

            </View>
            <View style={styles.exercise_container}>


                <View
                    style={[
                        styles.title_box,
                        { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10 },
                    ]}
                >
                    <Text style={styles.title}>Meals</Text>
                </View>

                <ScrollView horizontal={false} style={styles.box}>
                    <Text>{foodList}</Text>
                </ScrollView>
            </View>
            <View style={styles.btn_box}>
                <TouchableOpacity
                    onPress={() => {
                        navi.navigate("Macros");
                    }}
                    style={[styles.btn_shape, { marginHorizontal: 10 }]}
                >
                    <Text style={styles.btn_text}>Add Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.refresh()}
                    style={[
                        styles.btn_shape,
                        { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
                    ]}
                >
                    <Text style={styles.btn_text}>Refresh</Text>
                </TouchableOpacity>
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


export default Meals;