import { NavigationContainer } from '@react-navigation/native'; // https://reactnavigation.org/docs/getting-started/ + https://www.youtube.com/watch?v=FWwKjxSgLl8&ab_channel=PradipDebnath
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Footer from '../components/outros/footer';
import Navbar from '../components/outros/navbar';
import Styles from '../css/index';
import Fila from './fila';
import Index from './index';

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <SafeAreaView style={Styles.safeAreaView}>
                <Navbar />
            </SafeAreaView>

            <Stack.Navigator initialRouteName='Index'>
                <Stack.Screen component={Index} name='Index' options={{ headerShown: false }} />
                <Stack.Screen component={Fila} name='Fila' options={{ headerShown: false }} />
            </Stack.Navigator>

            <Footer />
        </NavigationContainer>
    );
}

