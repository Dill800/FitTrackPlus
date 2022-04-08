import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { TouchableOpacity, Image } from 'react-native'

import WeightLog from './WeightLog'
import WeightLogList from './WeightLogList'

const Stack = createNativeStackNavigator();

const WeightLogNavigator = ({navigation}) => {

    const options = {
        headerShown: true, 
        gestureEnabled: true,
        headerStyle: {
            backgroundColor: '#71ebeb',
            shadowColor: 'transparent',
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
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Weight Log'>
                <Stack.Screen name='Weight Log' options={options} component={WeightLog}/>
                <Stack.Screen name='Log List' options={options} component={WeightLogList}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default WeightLogNavigator;