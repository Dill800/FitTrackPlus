import {NavigationContainer, useNavigation, DefaultTheme, DarkTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { TouchableOpacity, Image } from 'react-native'
import {useSelector} from 'react-redux'


import WeightLog from './WeightLog'
import WeightLogList from './WeightLogList'
import reducers from "../redux/state/reducers";

const Stack = createNativeStackNavigator();

const DarkerTheme = {
    colors: {
      primary: '#71ebeb',
      background: '#121212',
      secondary: '#404040',
      card: '#181818',
      text: 'white',
    },
};

const DefaulterTheme = {
    colors: {
        primary: '#71ebeb',
        background: '#f2f2f2',
        secondary: 'white',
        card: '#d5dadf',
        text: 'black'
    }
}

const WeightLogNavigator = ({navigation}) => {

    const themeReducer = useSelector(({ themeReducer }) => themeReducer);

    const options = {
        headerShown: true, 
        gestureEnabled: true,
        headerStyle: {
            backgroundColor: '#71ebeb',
            shadowColor: 'transparent',
        },
        headerTitleStyle: {
            color: 'black'
        },
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Image
                    source={require('../assets/settings.png')}
                    style={{
                        width: 25,
                        height: 25,
                        // right: 20
                    }}
                />
            </TouchableOpacity>
        )
    }
    return (
        <NavigationContainer theme={themeReducer.theme ? DarkerTheme : DefaulterTheme} independent={true}>
            <Stack.Navigator initialRouteName='Weight Log'>
                <Stack.Screen name='Weight Log' options={options} component={WeightLog}/>
                <Stack.Screen name='Log List' options={options} component={WeightLogList}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default WeightLogNavigator;