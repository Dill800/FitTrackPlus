import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabActions, useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Home from '../screens/Home'
import Chat from '../screens/Chat'
import Login from '../screens/Login'
import Register from '../screens/Register'
import WeightLogNavigator from '../screens/WeightLogNavigator'
import Meals from '../screens/Meals'
import Macros from '../screens/Macros'
import WorkoutLogNavigator from '../screens/WorkoutLogNavigator'
import Settings from '../screens/Settings'
import MacrosNavigator from '../screens/MacrosNavigator'
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onpress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backGroundColor: '#000'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = ({ navigation }) => {

    const theme = useTheme();
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
                    backgroundColor: theme.colors.primary,
                    borderRadius: 15,
                    height: 80,
                    borderTopWidth: 0,
                    ...styles.shadow
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
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image
                                source={require('../assets/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94')
                                }}
                            />
                            <Text style={{ color: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94'), fontSize: 12 }}></Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'black',
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
                }} />

            <Tab.Screen name="Workout Log" component={WorkoutLogNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image
                                source={require('../assets/barbell.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94')
                                }}
                            />
                            <Text style={{ color: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94'), fontSize: 12 }}></Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'black',
                    }, headerShown: false,
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
            //}}
            />
            <Tab.Screen name="Chat" component={Chat}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object
                        navigation.navigate("Chat"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    },
                })}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image
                                source={require('../assets/chat.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94')
                                }}
                            />
                            <Text style={{ color: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94'), fontSize: 12 }}></Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'black',
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
                }} />
            <Tab.Screen name="Macros" component={MacrosNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image
                                source={require('../assets/fork.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94')
                                }}
                            />
                            <Text style={{ color: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94'), fontSize: 12 }}></Text>
                        </View>
                    ),

                    headerShown: false,
                    // headerStyle: {
                    //     backgroundColor: theme.colors.primary,
                    //   },
                    // headerTitleStyle: {
                    //     color: theme.colors.text,
                    // },
                    // headerRight: () => (
                    // <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    //     <Image
                    //         source={require('../assets/settings.png')}
                    //         style={{
                    //             width: 25,
                    //             height: 25,
                    //             right: 20
                    //         }}
                    //     />
                    // </TouchableOpacity>
                    // ),
                }}
            />

            <Tab.Screen name="Weight Log" component={WeightLogNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image
                                source={require('../assets/weight-scale.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94')
                                }}
                            />
                            <Text style={{ color: focused ? ((theme.dark) ? 'ivory' : '#000') : ((theme.dark) ? '#000' : '#748c94'), fontSize: 12 }}></Text>
                        </View>
                    ),
                    headerShown: false
                    // headerStyle: {
                    //     backgroundColor: '#71ebeb',
                    //   },
                    // headerRight: () => (
                    // <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    //     <Image
                    //         source={require('../assets/settings.png')}
                    //         style={{
                    //             width: 25,
                    //             height: 25,
                    //             right: 20
                    //         }}
                    //     />
                    // </TouchableOpacity>
                    // ),

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