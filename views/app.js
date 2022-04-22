import { NavigationContainer } from '@react-navigation/native'; // https://reactnavigation.org/docs/getting-started/ + https://www.youtube.com/watch?v=FWwKjxSgLl8&ab_channel=PradipDebnath
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Footer from '../components/outros/footer';
import Navbar from '../components/outros/navbar';
import Player from '../components/player/player';
import StylesGlobal from '../css/global';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';
import Fila from './fila';
import Index from './index';
import PlayerFullScreen from './playerFullScreen';

export default function App() {
    const Stack = createNativeStackNavigator();
    const refNavigation = useRef();
    const [rotaAtual, setRotaAtual] = useState('Index');
    StatusBar.setBarStyle('light-content', true); // Alterar a cor do StatusBar: https://stackoverflow.com/questions/39297291/how-to-set-ios-status-bar-background-color-in-react-native;

    return (
        <View style={{ backgroundColor: 'inherit', flex: 1 }}>
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
                        {/* Navbar */}
                        <SafeAreaView style={StylesGlobal.safeAreaView}>
                            <Navbar />
                        </SafeAreaView>

                        {/* Telas */}
                        <Stack.Navigator initialRouteName='Index'>
                            <Stack.Screen component={Index} name='Index' options={{ headerShown: false }} />
                            <Stack.Screen component={Fila} name='Fila' options={{ headerShown: false }} />
                            <Stack.Screen component={PlayerFullScreen} name='PlayerFullScreen' options={{ headerShown: false }} />
                        </Stack.Navigator>

                        {/* Player e footer: esconder ambos quando a tela for PlayerFullScreen */}
                        {/* É necessário esconder com css para que a música não pare! */}
                        <View style={rotaAtual === 'PlayerFullScreen' ? StylesGlobal.esconder : null}>
                            <Player />
                            <Footer rotaAtual={rotaAtual} />
                        </View>
                    </NavigationContainer>
                </MusicaProvider>
            </ListaMusicasProvider>
        </View>
    );
}

