import * as React from "react";

import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Donut from '../navigation/Donut'



class Macros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goalDailyActivity: "",
            activities: [],
        };
    }
    static navigationOptions = {
        title: "Macros",
    };

    render() {
        let foodList = [];
        const donutData = [{
            percentage: 1700,
            color: 'tomato',
            max: 2400,
            calorie: true,
            dataLabel: "calorie"
        }, {
            percentage: 76,
            color: 'skyblue',
            max: 92,
            calorie: false,
            dataLabel: "fat"
        }, {
            percentage: 130,
            color: 'gold',
            max: 150,
            calorie: false,
            dataLabel: "protein"
        }, {
            percentage: 200,
            color: '#222',
            max: 400,
            calorie: false,
            dataLabel: "carb"
        }];

        foodList.push(<View
            style={{
                alignItems: "center",
                width: 340,
                height: 200,
                paddingTop: 8,
                marginBottom: 15,
            }}
        >


        </View>)


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
            macrosText: {
                padding: 100,
            },
        });

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
                        <Text style={styles.title}>Macros</Text>
                    </View>

                    
                    <View style={{flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', top: 10, bottom: 10,}}>
                        {donutData.map((p, i) => {
                            return <Donut style={styles.macrosText} key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} calorie={p.calorie} dataLabel={p.dataLabel} />
                        })}
                    </View>
                    
                </View>
                <View style={styles.btn_box}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Exercise", {
                                username: this.props.navigation.state.params.username,
                                token: this.props.navigation.state.params.token,
                            });
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
}

export default Macros;