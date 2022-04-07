import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'


import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import WeightLogNavigator from '../screens/WeightLogNavigator'
import Meals from '../screens/Meals'
import WorkoutLogNavigator from '../screens/WorkoutLogNavigator'
import Settings from '../screens/Settings'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ... styles.shadow
        }}
        onpress={onPress}
    >
        <View style= {{
            width: 70,
            height: 70,
            borderRadius: 35,
            backGroundColor: '#000'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = ({navigation}) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#71ebeb',
                    borderRadius: 15,
                    height: 80,
                    ... styles.shadow
                }
            }}
        >
                <Tab.Screen name="Home" component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                
                        // Do something with the `navigation` object
                        navigation.navigate("Home"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        },
                    })} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/home.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#000' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#000' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                        headerTitleStyle: {
                            color: '#000',
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                <Image
                                    source={require('../assets/settings.png')}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        right: 20
                                    }}
                                />
                          </TouchableOpacity>
                          ),
                }}/>
                <Tab.Screen name="Workout Log" component={WorkoutLogNavigator} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/barbell.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#000' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#000' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                        headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                            <Image
                                source={require('../assets/settings.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    right: 20
                                }}
                            />
                        </TouchableOpacity>
                        ),  
                    }}
                    // options={{
                    //     tabBarIcon: ({focused}) => (
                    //         <Image
                    //             source={require('../assets/barbell.png')}
                    //             resizeMode="contain"
                    //             style={{
                    //                 width: 30,
                    //                 height: 30,
                    //                 tintColor: '#fff'
                    //             }}
                    //         />
                    //     ),
                    //     tabBarButton: (props) => (
                    //         <CustomTabBarButton {... props} />
                    //     )
                    // }}
                />
                <Tab.Screen name="Meals" component={Meals} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/fork.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#000' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#000' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                        headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                            <Image
                                source={require('../assets/settings.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    right: 20
                                }}
                            />
                        </TouchableOpacity>
                        ),
                }}
                />
                <Tab.Screen name="Weight Log" component={WeightLogNavigator} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/weight-scale.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#000' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#000' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                        headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                            <Image
                                source={require('../assets/settings.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    right: 20
                                }}
                            />
                        </TouchableOpacity>
                        ),
                }}
                />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;