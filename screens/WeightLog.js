
import { keyboardDismissHandlerManager, Row } from 'native-base';
import React, {useState, useEffect} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, Keyboard, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG } from 'react-native-svg';
  
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Logger
} from './../components/styles'

const WeightLog = ({navigation}) => {

    const [weight, setWeight] = useState('');
    const [point, setPoint] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6"],
        datasets: [
          {
            data: [201.2, 200.8, 200.7, 201.0, 200.3, 200.1],
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

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Logger>
                <Text style={{color: 'black', fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Weight Log</Text>
                <View style={styles.progress_container}>
                    <View style={styles.progress_box}>
                        <Text style={styles.progress_title}>Add Weight</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.input_placeholder}
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
                                style={styles.btn_shape}
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
    input_placeholder: {
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: "#121212",
        backgroundColor: "#f0f8ff"
    },
    btn_shape: {
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
        width: "95%",
        height: 'auto',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    progress_title: {
        color: "#121212",
        alignSelf: "center",
        marginVertical: 20,
    },
    progress_value: {
        color: "#121212",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
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
})

export default WeightLog;