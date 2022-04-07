import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import WeightLog from './WeightLog'
import WeightLogList from './WeightLogList'

const Stack = createNativeStackNavigator();

const WeightLogNavigator = ({navigation}) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Weight Log'>
                <Stack.Screen name='Weight Log' options={{headerShown: false, gestureEnabled: true}} component={WeightLog}/>
                <Stack.Screen name='Log List' options={{headerShown: false, gestureEnabled: true}} component={WeightLogList}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default WeightLogNavigator;