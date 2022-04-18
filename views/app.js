import { NavigationContainer } from '@react-navigation/native'; // https://reactnavigation.org/docs/getting-started/ + https://www.youtube.com/watch?v=FWwKjxSgLl8&ab_channel=PradipDebnath
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Fila from './fila';
import Index from './index';

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen component={Index} name='Index' />
                <Stack.Screen component={Fila} name='Fila' />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

