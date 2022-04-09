import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Meals from './Meals'
import Macros from './Macros'
import EditMacros from './EditMacros'

const Stack = createNativeStackNavigator();

const MacrosNavigator = ({navigation}) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Macros'>
                <Stack.Screen name='Macros' options={{headerShown: false, gestureEnabled: true}} component={Macros}/>
                <Stack.Screen name='Meals' options={{headerShown: false, gestureEnabled: true}} component={Meals}/>
                <Stack.Screen name='EditMacros' options={{headerShown: false, gestureEnabled: true}} component={EditMacros}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MacrosNavigator;