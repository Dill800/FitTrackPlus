import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Meals from '../screens/Meals'

const Tab = createBottomTabNavigator();

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
            backGroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
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
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/home.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#e32f45' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                        headerTitleStyle: {
                            color: '#71ebeb',
                        },
                }}/>
                <Tab.Screen name="Login" component={Login} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/barbell.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#e32f45' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
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
                <Tab.Screen name="Register" component={Register} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                                <Image
                                    source={require('../assets/fork.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#e32f45' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
                }}
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
                                        tintColor: focused ? '#e32f45' : '#748c94'
                                    }}
                                />
                                <Text style ={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}></Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#71ebeb',
                          },
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