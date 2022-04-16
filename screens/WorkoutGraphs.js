import { ArrowBackIcon, keyboardDismissHandlerManager, Row } from 'native-base';
import React, {useState, useEffect} from 'react';
import { TouchableWithoutFeedback, Pressable, Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, Button, Keyboard, TouchableOpacity, MaskedViewComponent, TouchableWithoutFeedbackBase } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG } from 'react-native-svg';
import {NavigationContainer, useNavigation, useTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'
import { format } from 'date-fns'
import {useSelector, useDispatch} from 'react-redux'
import { updateUsername } from '../redux/actions/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown'

import config from '../backend/config/config.js'
import { exp } from 'react-native-reanimated';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const WorkoutGraph = ({navigation}) => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

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
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
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
            marginTop: 12,
            justifyContent: "center",
        },
        box: {
            backgroundColor: theme.colors.primary,
            width: "95%",
            height: 125,
            borderRadius: 10,
            marginBottom: 10
            // borderBottomLeftRadius: 0,
            // borderBottomRightRadius: 0,
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
            // borderTopLeftRadius: 0,
            // borderTopRightRadius: 0,
            alignItems: 'center',
            paddingTop: "5%",
            marginBottom: -20
        },
        bottom_buttons: {
            flex: 1,
            flexDirection: 'row'
        },
        dropdown2BtnStyle: {
            width: '100%',
            height: 42,
            backgroundColor: theme.colors.secondary,
            borderRadius: 8,
            paddingHorizontal: 30,
          },
          dropdown2BtnTxtStyle: {
            color: theme.colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
          },
          dropdown2DropdownStyle: {
            backgroundColor: theme.colors.secondary,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          },
          dropdown2RowStyle: {backgroundColor: theme.colors.secondary, borderBottomColor: 'transparent'},
          dropdown2RowTxtStyle: {
            color: theme.colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
          },
    })

    const navi = useNavigation();

    const [weight, setWeight] = useState('');
    const [point, setPoint] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const screenWidth = Dimensions.get("window").width;

    const dataWeek = {
        x: ["3/11", "3/12", "3/13", "3/14", "3/15"],
        y: [198.3, 197.3, 197.9, 197.2, 196.9]
    };

    const dataMonth = {
        x: ["3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15"],
        y: [200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9]
    };

    const dataAll = {
        x: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12", "3/13", "3/14", "3/15", "3/16", "3/17", "3/18", "3/19", "3/20", "3/21", "3/22", "3/23", "3/24", "3/25", "3/26", "3/27", "3/28", "3/29", "3/30", "3/31", "4/1", "4/2", "4/3", "4/4", "4/5", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12", "4/13"],
        y: [201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9, 201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9, 201.2, 200.8, 200.7, 201.0, 200.3, 200.1, 199.6, 199.2, 200.4, 199.1, 198.3, 197.3, 197.9, 197.2, 196.9]
    };

    const week = [];
    const month = [];
    const all = [];

    for (let i = 0; i < dataWeek.x.length; i++) {
        // console.log(dataWeek.x[i] + "/22");
        week.push({x: i.toString(), y: dataWeek.y[i], meta: format(new Date(dataWeek.x[i] + "/22"), 'MMM-dd')});
        // console.log(week[i].x);
    }

    for (let i = 0; i < dataMonth.x.length; i++) {
        // console.log(dataWeek.x[i] + "/22");
        month.push({x: i.toString(), y: dataMonth.y[i], meta: format(new Date(dataMonth.x[i] + "/22"), 'MMM-dd')});
        // console.log(week[i].x);
    }

    for (let i = 0; i < dataAll.x.length; i++) {
        // console.log(dataWeek.x[i] + "/22");
        all.push({x: i.toString(), y: dataAll.y[i], meta: format(new Date(dataAll.x[i] + "/22"), 'MMM-dd')});
        // console.log(week[i].x);
    }

    // for (let i = 0; i < dataMonth.x.length; i++) {
    //     month.push({x: dataMonth.x[i], y: dataMonth.y[i]});
    // }

    // for (let i = 0; i < dataAll.x.length; i++) {
    //     all.push({x: dataAll.x[i], y: dataAll.y[i]});
    // }

    // const chartConfig = {
    //     backgroundColor: theme.colors.card,
    //     backgroundGradientFrom: theme.colors.card,
    //     backgroundGradientTo: theme.colors.card,
    //     color: (opacity = 1) => theme.colors.text,
    //     decimalPlaces: 1,
    //     useShadowColorFromDataset: false,
    //     propsForDots: {
    //         r: "5",
    //         stroke: "black"
    //     },
    //     propsForVerticalLabels: {
    //         dy: 10,
    //         dx: -10
    //     }
    //   };

    var axios = require('axios');
    var qs = require('qs');

    const submitWeight = (weight) => {

        if (weight == '') {
            return;
        }

        var data = qs.stringify({
            'username': userData.username.username,
            'weight': weight 
        });
        var config2 = {
            method: 'post',
            url: 'http://' + config.ipv4 + ':5000/user/addWeight',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config2)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                let data = userData.username;
                let goodDate = new Date();
                goodDate.setHours(goodDate.getHours());
                data.weightList.push({
                    'weight': weight,
                    'date': goodDate,
                })

                // data.groupName = newGroupName;
                dispatch(updateUsername(data))
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const [data, setData] = useState(dater);
    const [allData, setAllData] = useState(dater);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [min, setMin] = useState(99999);
    const [max, setMax] = useState(-99999);
    const [val, setVal] = useState(dater);
    // const [dataSize, setDataSize] = useState(dataAll.length);
    const [grouper, setGrouper] = useState(9999)
    const [getWilks, setWilks] = useState(0);

    // let min = 9999
    // let max = -9999
    const dater = [];
    const valer = [];

    useEffect(() => {
        async function getLogList() {

            var config2 = {
                method: 'get',
                url: 'http://' + config.ipv4 + ':5000/user/getWeightLog?username=' + userData.username.username,
                headers: { },
            };

            axios(config2)
                .then(function (response) {
                    let bigDog = JSON.stringify(response.data.data);
                    let biggerDog = (JSON.parse(bigDog));
                    // console.log(JSON.stringify(response.data));
                    for (var i = 0; i < biggerDog.length; i++) {
                        // console.log(biggerDog[i]);
                        // console.log(diff);
                        dater.push({x: i.toString(), y: biggerDog[i].weight, meta: format(new Date(biggerDog[i].date), "MMM-dd").toString()});
                        valer.push(biggerDog[i].weight)
                        // console.log(typeof(biggerDog[i].weight));
                        //setFriendsList(friendsList.concat(friend));
                        //setFriendsList(friendsList.concat(biggerDog[i].username));
                        // console.log('weidht text ' + dater[i]);
                        // console.log('big tester ' + i + ' ' + dater[i].x + ' ' + dater[i].y + ' ' + dater[i].meta)
                        
                        // console.log(biggerDog[i].weight + ' ' + min + ' ' + max)
                        // if (biggerDog[i].weight <= min) {
                        //     min = biggerDog[i].weight
                        //     console.log('minminmin')
                        // } 
                        
                        // if (biggerDog[i].weight >= max) {
                        //     max = biggerDog[i].weight
                        // }
                        console.log('uses effect like a boss')
                      }
                    
                      setData([]);
                      setLoading(false);
                      setAllData(dater);
                      setMin(Math.min(...valer));
                      setMax(0);
                      setSubmitted(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (loading || submitted) {
            getLogList();
        }
    }, [render]);

    if (loading) {
        return (
            <Text>Loading...</Text>
        )
    }

    const dataSetter = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].x = i
        }

        setData(arr)
    }

    let exercises = []
    let megaData = {}

    // have object [exercise name] of list of object [date and 1rm]
    let calcMax = (sets, reps, weight) => {
        //return parseInt((100 * weight) / (101.3 - 2.67123 * reps))
        //console.log("reps", reps);
        //console.log("max", parseInt(exp(-0.055 * reps)));
        if (reps == 1) {
            return weight;
        }
        return parseInt((100 * weight) / (52.2 + (41.9 * Math.exp(-0.055 * reps))))
    }

    let sameDay = (x, actdate) => {
      //console.log('x', x)
      //console.log('otehr', actdate)
      let k = x.getDate() === actdate.getDate() && x.getMonth() === actdate.getMonth() && x.getFullYear() === actdate.getFullYear();
      //console.log(k)
      return k;
    }



    let getExercises = () => {
      //console.log("Populating exercise stuff")
      let data = userData.username.workoutlogList;

      for(let i = 0; i < data.length; i++) {
        let eggs = data[i].exercises;
        let d = data[i].date;
        for(let j = 0; j < eggs.length; j++) {
            let name = String(eggs[j].name).toLowerCase();
            if (name.substring(0,5) == "bench") {
                name = "bench";
            }

          if (name in megaData) {

            // calculate max
            // see if date exists. if not, add in
            // if date exists and max is greater, update max
            let max = calcMax(eggs[j].sets, eggs[j].reps, eggs[j].weight)
            let vals = megaData[name]
            //console.log(vals)
            if(vals === undefined) {
              console.log('vals is undefined')
              return;
            }
            

            let index = vals.findIndex(obj => sameDay(new Date(obj.date), new Date(d))); // <- error, see if obj.date is on same day as d
            
            if(index === -1) {
              //megaData[eggs[j].name] = [];
              megaData[name].push({
                'date': d,
                'max': max
              })
            }
            else {
              // date exists

              if(megaData[name][index].max < max) {
                megaData[name][index].max = max;
              }

            }


          }
          else {

            // if exercise is new
            megaData[name] = []
            megaData[name].push({
              'date': d,
              'max': calcMax(eggs[j].sets, eggs[j].reps, eggs[j].weight)
            })

          }

          if(!exercises.includes(name)) {
            if (name.substring(0,5) == "bench") {
                if (!exercises.includes("bench")) {
                    exercises.push("bench");
                }
            }
            else {
                exercises.push(name)
            }
          }
        }

      }
      //console.log('exercises unique: ', exercises)

      //console.log('megadata: ',megaData)

      //console.log('megadata: ',megaData)


    }
    getExercises()

    let wilks = 0;
    let benchMax = 0;
    let squatMax = 0;
    let deadLiftMax = 0;
    for (let exercises in megaData) {
          //console.log(exercises);
          // console.log(megaData[i].toLowerCase());
          if (String(exercises).toLowerCase() == "squat") {

              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > squatMax) {
                      squatMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("squat2");
          }
          if (String(exercises).toLowerCase().substring(0,5) == "bench") {
              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > benchMax) {
                      benchMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("bench2");
          }
          if (String(exercises).toLowerCase() == "deadlift") {
              for (let i = 0; i < megaData[exercises].length; i++) {
                  if (megaData[exercises][i].max > deadLiftMax) {
                      deadLiftMax = megaData[exercises][i].max 
                  }
              }
          
              console.log("deadlift2");
          }

          // else if (megaData[exercises].toLowerCase().substring(0,5) == "bench") {
          //    // megaData[i].name;
          //     console.log("bench");
          // }
          // else if (megaData[exercises].toLowerCase() == "deadlift") {
          //     //megaData[i].name;
          //     console.log("dead");
          // }
    }
    console.log("start");
    console.log("squat", squatMax);
    console.log("bench", benchMax);
    console.log("deadlift", deadLiftMax);

    let W = (parseInt(squatMax) + parseInt(benchMax) + parseInt(deadLiftMax)) / 2.2046;
    console.log("total weight", W);
    console.log("total weight lbs", squatMax + benchMax + deadLiftMax);

    let a = -216.0475144
    let b = 16.2606339
    let c = -0.002388645
    let d = -0.00113732
    let e = 7.01863 * Math.pow(10, -6)
    let f = -1.291 * Math.pow(10, -8)
  
    let x = userData.username.weightList[userData.username.weightList.length - 1].weight / 2.2046;
    console.log("bodyweight", x);
    wilks = (W * 500) / (a + (b * x) + (c * Math.pow(x,2)) + (d * Math.pow(x,3))  + (e * Math.pow(x,4)) + (f * Math.pow(x,5)));
    wilks = wilks.toFixed(2);
    let level = "";
    if (wilks >= 414) {
        level = "Elite";
    }
    else if (wilks >= 326) {
        level = "Advanced";
    }
    else if (wilks >= 238) {
        level = "Intermediate";
    }
    else if (wilks >= 200) {
        level = "Novice";
    }
    else {
        level = "Untrained";;
    }
    //setWilks(wilks);
    console.log("wilks", wilks);
    //setWilks(wilks);
    //let wilks = 0;
    return (
        <HideKeyboard>
        <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.container}>
                    <View style={[styles.box, {alignItems: 'center'}]}>
                        <Text style={{color: theme.colors.text, fontSize: 33, fontFamily: 'Avenir-Roman', textAlign: 'center', paddingTop: 15, paddingBottom: 8}}>1RM Graphs</Text>
                        <View style={styles.inputView}>
                            
                        <SelectDropdown
                          data={exercises}
                          onSelect={(selectedItem, index) => {
                            //console.log(selectedItem, index)
                            // {x: i.toString(), y: biggerDog[i].weight, meta: format(new Date(biggerDog[i].date), "MMM-dd").toString()}

                            let d = [];
                            let targ = megaData[selectedItem];
                            //console.log("Targ: ", targ);
                            //console.log("Sorting targ...")
                            targ.sort((a,b) => (a.date > b.date) ? 1 : -1)
                            let benchod = 0;
                            for(let i = 0; i < targ.length; i++) {
                              if(benchod < targ[i].max) benchod = targ[i].max;
                              d.push({
                                x: i.toString(),
                                y: targ[i].max,
                                meta: format(new Date(targ[i].date), "MMM-dd").toString()
                              })
                            }
                            //console.log("Hook date:", d)
                            //return;

                            setData(d)

                            setMax(benchod)

                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                          }}
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                          }}
                          buttonStyle={styles.dropdown2BtnStyle}
                          buttonTextStyle={styles.dropdown2BtnTxtStyle}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown2DropdownStyle}
                          rowStyle={styles.dropdown2RowStyle}
                          rowTextStyle={styles.dropdown2RowTxtStyle}
                          defaultButtonText={'Select an exercise:'}
                          renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.text} size={18} />;
                          }}
                        />


                        </View>
                    </View>
                </View>
                <View style={styles.graph}>

                        {data.length > 0  ? <Chart
                            style={{ height: 250, width: '90%'}}
                            data={data}
                            /*

                            initially populate a list from axios call with all exercises and 1rm
                            when exercise is selected filter that list
                            send filtered list into chart
        {x: i.toString(), y: biggerDog[i].weight, meta: format(new Date(biggerDog[i].date), "MMM-dd").toString()}

                            */
                            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                            xDomain={{ min: 0, max: data.length}}
                            yDomain={{ min: 0, max: max + 100}}
                            viewport={{ size: { width: 5 }, initialOrigin: {x: 0} }}
                        >
                            <VerticalAxis
                                tickCount={5}
                                theme={{
                                axis: { stroke: { color: theme.colors.text, width: 2 } },
                                ticks: { stroke: { color: theme.colors.text, width: 2 } },
                                labels: {
                                    label: {
                                        color: theme.colors.text
                                    },  
                                    formatter: (v) => v.toFixed(2) 
                                },
                                }}
                            />
                            <HorizontalAxis
                                tickValues={Array.from({length: data.length}, (v, i) => i)}
                                theme={{
                                axis: { stroke: { color: '#aaa', width: 2 } },
                                ticks: { stroke: { color: '#aaa', width: 2 } },
                                labels: {
                                    label: {
                                        color: theme.colors.text
                                    }, 
                                    formatter: (v) => data[v].meta
                                },
                                }}
                            />
                            <Area theme={{ gradient: { from: { color: theme.colors.primary, opacity: 0.4 }, to: { color: theme.colors.primary, opacity: 0.4 } } }} smoothing="cubic-spline" />
                            <Line
                                smoothing={"cubic-spline"}
                                tooltipComponent={
                                    <Tooltip
                                        theme={{
                                            label: {color: theme.colors.text},
                                            shape: { width: 100, color: theme.colors.primary },
                                            formatter: (v) => 
                                                v.y.toString() + " (" + v.meta + ")"
                                        }}
                                    />
                                }
                                theme={{                                    
                                    stroke: { color: theme.colors.primary, width: 5 },
                                    // scatter: {
                                    //   selected: { width: 4, height: 4, rx: 4, color: "white" },
                                    // }
                                    scatter: { default: { width: 8, height: 8, rx: 4, color: theme.colors.primary }, selected: { color: 'white' } }
                                }}
                            />
                        </Chart>
                        :
                        <Text styles={{color: theme.colors.text}}></Text>}
                        {/* <Text>{'hi ' + data.length}</Text> */}

                        
                    {/* </ScrollView> */}
                </View>
                <Text style={{color: theme.colors.text, fontSize: 30, textAlign: 'center', bottom: 80, fontFamily: 'Avenir-Roman',}}>Wilks Score: {wilks}</Text>
                <Text style={{color: theme.colors.text, fontSize: 30, textAlign: 'center', bottom: 80, fontFamily: 'Avenir-Roman',}}>({level})</Text>
            
        </View>
        </HideKeyboard>
      );

}

export default WorkoutGraph;