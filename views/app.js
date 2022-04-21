import { NavigationContainer } from '@react-navigation/native'; // https://reactnavigation.org/docs/getting-started/ + https://www.youtube.com/watch?v=FWwKjxSgLl8&ab_channel=PradipDebnath
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Footer from '../components/outros/footer';
import Navbar from '../components/outros/navbar';
import Player from '../components/player/player';
import Styles from '../css/global';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';
import Fila from './fila';
import Index from './index';
import PlayerFullScreen from './playerFullScreen';

export default function App() {
    const Stack = createNativeStackNavigator();
    const refNavigation = useRef();
    const [rotaAtual, setRotaAtual] = useState('Index');

    return (
        <ListaMusicasProvider>
            <MusicaProvider>
                <NavigationContainer
                    ref={refNavigation}
                    onStateChange={() => {
                        const currentRouteName = refNavigation.current.getCurrentRoute().name;
                        // console.log(currentRouteName);
                        setRotaAtual(currentRouteName);
                    }}
                >
                    <SafeAreaView style={Styles.safeAreaView}>
                        <Navbar />
                    </SafeAreaView>

                    <Stack.Navigator initialRouteName='Index'>
                        <Stack.Screen component={Index} name='Index' options={{ headerShown: false }} />
                        <Stack.Screen component={Fila} name='Fila' options={{ headerShown: false }} />
                        <Stack.Screen component={PlayerFullScreen} name='PlayerFullScreen' options={{ headerShown: false }} />
                    </Stack.Navigator>

                    {
                        rotaAtual !== 'PlayerFullScreen' && (
                            <Fragment>
                                <Player />
                                <Footer rotaAtual={rotaAtual} />
                            </Fragment>
                        )
                    }
                </NavigationContainer>
            </MusicaProvider>
        </ListaMusicasProvider>
    );
}

