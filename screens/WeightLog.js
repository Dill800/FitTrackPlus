
import { keyboardDismissHandlerManager, Row } from 'native-base';
import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Pressable, Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, Keyboard, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG } from 'react-native-svg';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

  
import { Logger } from './../components/styles'
import WeightLogList from './WeightLogList'

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const WeightLog = ({navigation}) => {

    const theme = useTheme();
    
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
            backgroundColor: theme.colors.secondary
        },
        button: {
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
        container: {
            flexDirection: "row",
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
        },
        box: {
            backgroundColor: theme.colors.card,
            width: "95%",
            height: 125,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        title: {
            color: theme.colors.text,
            alignSelf: "center",
            marginVertical: 20,
        },
        graph: {
            backgroundColor: theme.colors.card,
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

    const navi = useNavigation();

    const [weight, setWeight] = useState('');
    const [point, setPoint] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const screenWidth = Dimensions.get("window").width;

    const dataWeek = {
        labels: ["3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
            {
              data: [198.3, 197.3, 197.9, 197.2, 196.9],
              color: (opacity = 1) => theme.colors.primary,            }
        ],
    };

    const dataMonth = {
        labels: ["3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
            {
                data: [200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9],
                color: (opacity = 1) => theme.colors.primary,
            }
        ]
    };

    const dataAll = {
        labels: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15"],
        datasets: [
          {
            data: [201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9],
            color: (opacity = 1) => theme.colors.primary,
          }
        ],
      };

    const chartConfig = {
        backgroundColor: theme.colors.card,
        backgroundGradientFrom: theme.colors.card,
        backgroundGradientTo: theme.colors.card,
        color: (opacity = 1) => theme.colors.text,
        decimalPlaces: 1,
        useShadowColorFromDataset: false,
        propsForDots: {
            r: "5",
            stroke: "black"
        }
      };

    const [data, setData] = useState(dataAll);

    useEffect(() => {
        console.log('hi')
        setData(dataAll);
    }, [theme.colors.primary]);

    return (
        <HideKeyboard>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Logger>
                <Text style={{color: theme.colors.text, fontSize: 38, fontFamily: 'Avenir-Roman', textAlign: 'center'}}>Weight Log</Text>
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
                            withVerticalLines={false}
                            withHorizontalLines={false}
                            decorator={() => {
                                return (
                                    point.visible ? <View>
                                        <Svg>
                                            <Rect x={point.x - 15} 
                                                y={point.y + 10} 
                                                width="40" 
                                                height="30"
                                                fill={theme.colors.primary} 
                                                rx={10}/>
                                                <TextSVG
                                                    x={point.x + 5}
                                                    y={point.y + 30}
                                                    fill='black'
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
                                        setPoint(prevState => {
                                            return { 
                                                      x: prevState.x,
                                                      y: prevState.y,
                                                      visible: false,
                                                      value: prevState.value
                                                   }
                                            })
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
                                        setPoint(prevState => {
                                            return { 
                                                      x: prevState.x,
                                                      y: prevState.y,
                                                      visible: false,
                                                      value: prevState.value
                                                   }
                                            })
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
                                        setPoint(prevState => {
                                            return { 
                                                      x: prevState.x,
                                                      y: prevState.y,
                                                      visible: false,
                                                      value: prevState.value
                                                   }
                                            })
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
        </HideKeyboard>
      );

}

export default WeightLog;