import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { TouchableOpacity, Image } from 'react-native'
import {useSelector} from 'react-redux'

import Meals from './Meals'
import Macros from './Macros'
import ManualMeal from './ManualMeal'
import EditMacros from './EditMacros'
import MacroCalculator from './MacroCalculator'
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
      third: "rgba(153,50,245,1)",
    },
};

const DefaulterTheme = {
    dark: false,
    colors: {
        primary: '#71ebeb',
        background: '#f2f2f2',
        secondary: 'white',
        card: '#d5dadf',
        text: 'black',
        third: 'rgba(178,108,233,1)',
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
                <Stack.Screen name='Macro Calculator' options={options} component={MacroCalculator}/>
                <Stack.Screen name='Add Meal' options={options} component={ManualMeal}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MacrosNavigator;