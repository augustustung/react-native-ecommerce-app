import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => { } }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ header: () => { } }} />
        </Stack.Navigator>
    );
}

export default AuthNavigation;