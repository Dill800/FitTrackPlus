
import { keyboardDismissHandlerManager, Row } from 'native-base';
import React, {useState, useEffect} from 'react';
import { Pressable, Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, Keyboard, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG } from 'react-native-svg';
import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

  
import { Logger } from './../components/styles'
import WeightLogList from './WeightLogList'

const WeightLog = ({navigation}) => {

    const navi = useNavigation();

    const [weight, setWeight] = useState('');
    const [point, setPoint] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const screenWidth = Dimensions.get("window").width;

    const dataWeek = {
        labels: ["3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
            {
              data: [198.3, 197.3, 197.9, 197.2, 196.9],
              color: (opacity = 1) => `rgba(113, 235, 235, ${opacity})`
            }
        ],
    };

    const dataMonth = {
        labels: ["3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
            {
                data: [200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9],
                color: (opacity = 1) => `rgba(113, 235, 235, ${opacity})`
            }
        ]
    };

    const dataAll = {
        labels: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
          {
            data: [201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9],
            color: (opacity = 1) => `rgba(113, 235, 235, ${opacity})`
          }
        ],
      };

    const chartConfig = {
        backgroundColor: "#d5dadf",
        backgroundGradientFrom: "#d5dadf",
        backgroundGradientTo: "#d5dadf",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 1,
        useShadowColorFromDataset: false,
        propsForDots: {
            r: "5",
            stroke: "black"
        }
      };

    const [data, setData] = useState(dataAll);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Logger>
                <Text style={{color: 'black', fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Weight Log</Text>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.title}>Add Weight</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                placeholder='Submit'
                                placeholderTextColor='grey'
                                onChangeText={e => setWeight(e)}
                                value={weight}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setWeight('');
                                }}
                                style={styles.button}
                            >
                                <Text>⬇️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.graph}>
                    {/* <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} // to hide scroll bar
                        style={{height: 500}}
                    > */}
                        <LineChart
                            data={data}
                            width={screenWidth * 0.8}
                            height={250}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 10,
                                borderRadius: 15
                            }}
                            // withVerticalLines={false}
                            // withHorizontalLines={false}
                            decorator={() => {
                                return (
                                    point.visible ? <View>
                                        <Svg>
                                            <Rect x={point.x - 15} 
                                                y={point.y + 10} 
                                                width="40" 
                                                height="30"
                                                fill="#71ebeb" 
                                                rx={10}/>
                                                <TextSVG
                                                    x={point.x + 5}
                                                    y={point.y + 30}
                                                    fill="black"
                                                    fontSize="12"
                                                    fontWeight="bold"
                                                    textAnchor="middle">
                                                    {point.value}
                                                </TextSVG>
                                        </Svg>
                                    </View> : null
                                )
                            }}
                            onDataPointClick={(data) => {
                                if (point.x == data.x && point.y == data.y) {
                                    setPoint(prevState => {
                                    return { 
                                              x: prevState.x,
                                              y: prevState.y,
                                              visible: !prevState.visible,
                                              value: data.value
                                           }
                                    })
                                } else {
                                    setPoint({
                                         x: data.x,
                                         y: data.y, 
                                         visible: true,
                                         value: data.value
                                    });
                                }
                            }}
                        />
                        <View style={styles.bottom_buttons}>
                            <TouchableOpacity
                                    onPress={() => {
                                        setData(dataWeek);
                                    }}
                                    style={[styles.button, {borderTopRightRadius: 0, 
                                        borderBottomRightRadius: 0, 
                                        borderTopLeftRadius: 15, 
                                        borderBottomLeftRadius: 15, 
                                        marginHorizontal: 0,
                                        borderColor:'black',
                                        borderWidth:1
                                    }]}
                                >
                                    <Text>1w</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    onPress={() => {
                                        setData(dataMonth);
                                    }}
                                    style={[styles.button, {borderTopRightRadius: 0, 
                                        borderBottomRightRadius: 0, 
                                        marginHorizontal: 0,
                                        borderColor:'black',
                                        borderWidth:1,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0
                                    }]}
                                >
                                    <Text>1m</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    onPress={() => {
                                        setData(dataAll);
                                    }}
                                    style={[styles.button, {marginHorizontal: 0,
                                        borderColor:'black',
                                        borderWidth:1
                                    }]}
                                >
                                    <Text>All</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                                    onPress={() => {
                                        navi.navigate("Log List");
                                    }}
                                    style={[styles.button, {borderTopLeftRadius: 15, 
                                        borderBottomLeftRadius: 15,
                                        borderColor:'black',
                                        borderWidth:1,
                                        marginHorizontal: 0
                                    }]}
                                >
                                    <Text>View Log</Text>
                            </TouchableOpacity>
                    {/* </ScrollView> */}
                </View>
            </Logger>
        </View>

      );

}

const styles = StyleSheet.create({
    logView:{
        height: 500,
        width: '70%',
        backgroundColor: '#f0f8ff',
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        borderBottomStartRadius: 60,
        borderBottomEndRadius: 60,
        alignItems: "center",
    },
    inputView:{
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
        color: "#121212",
        backgroundColor: "#f0f8ff"
    },
    button: {
        backgroundColor: "#71ebeb",
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: 40,
        margin: 10,
        marginLeft: 0,
        justifyContent: "center",
        paddingHorizontal: 20
    },
    title: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        alignSelf: "center",
    },
    container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
    },
    box: {
        backgroundColor: "rgba(213,218,223,1)",
        width: "95%",
        height: 'auto',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    title: {
        color: "#121212",
        alignSelf: "center",
        marginVertical: 20,
    },
    graph: {
        backgroundColor: "rgba(213,218,223,1)",
        width: "95%",
        height: 400,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: 'center',
        paddingBottom: 20
    },
    bottom_buttons: {
        flex: 1,
        flexDirection: 'row'
    }
})

export default WeightLog;