import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { TouchableOpacity, Image } from 'react-native'
import {useSelector} from 'react-redux'

import Meals from './Meals'
import Macros from './Macros'
import EditMacros from './EditMacros'
import reducers from "../redux/state/reducers";


const Stack = createNativeStackNavigator();

const DarkerTheme = {
    dark: true,
    colors: {
      primary: '#44adff',
      background: '#121212',
      secondary: '#404040',
      card: '#181818',
      text: 'white',
    },
};

const DefaulterTheme = {
    dark: false,
    colors: {
        primary: '#71ebeb',
        background: '#f2f2f2',
        secondary: 'white',
        card: '#d5dadf',
        text: 'black'
    }
}

const MacrosNavigator = ({navigation}) => {
    
    const themeReducer = useSelector(({ themeReducer }) => themeReducer);

    const options = {
        headerShown: true, 
        gestureEnabled: true,
        headerStyle: {
            backgroundColor: themeReducer.theme ? DarkerTheme.colors.primary : DefaulterTheme.colors.primary,
            shadowColor: 'transparent',
        },
        headerTitleStyle: {
            color: 'black'
        },
        headerTintColor: 'black',
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
            <Stack.Navigator initialRouteName='Macros'>
                <Stack.Screen name='Macros' options={options} component={Macros}/>
                <Stack.Screen name='Meals' options={options} component={Meals}/>
                <Stack.Screen name='Edit Macros' options={options} component={EditMacros}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MacrosNavigator;