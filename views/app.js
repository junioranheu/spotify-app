import { NavigationContainer } from '@react-navigation/native'; // https://reactnavigation.org/docs/getting-started/ + https://www.youtube.com/watch?v=FWwKjxSgLl8&ab_channel=PradipDebnath
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment, useRef, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message'; // https://github.com/calintamas/react-native-toast-message
import Footer from '../components/outros/footer';
import Navbar from '../components/outros/navbar';
import Player from '../components/player/player';
import StylesGlobal from '../css/global';
import { InfoMusicaProvider } from '../utils/context/infoMusicaContext';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';
import { PlaylistsProvider } from '../utils/context/playlistsContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';
import Fila from './fila';
import Index from './index';
import Login from './login';
import PlayerFullScreen from './playerFullScreen';
import Playlist from './playlist';
import Splash from './splash';

export default function App() {
    const Stack = createNativeStackNavigator();
    const refNavigation = useRef();
    const [rotaInicial, setRotaInicial] = useState(Platform.OS === 'web' ? 'Index' : 'Splash');
    const [rotaAtual, setRotaAtual] = useState(rotaInicial);
    StatusBar.setBarStyle('light-content', true); // Alterar a cor do StatusBar: https://stackoverflow.com/questions/39297291/how-to-set-ios-status-bar-background-color-in-react-native;

    return (
        <Fragment>
            {/* Conteúdo principal */}
            <View style={{ backgroundColor: '#121212', flex: 1 }}>
                <UsuarioProvider>
                    <PlaylistsProvider>
                        <ListaMusicasProvider>
                            <MusicaProvider>
                                <InfoMusicaProvider>
                                    <NavigationContainer
                                        ref={refNavigation}
                                        onStateChange={() => {
                                            const currentRouteName = refNavigation.current.getCurrentRoute().name;
                                            // console.log(currentRouteName);
                                            setRotaAtual(currentRouteName);
                                        }}
                                    >
                                        {/* Navbar (é o que "desbuga" o statusbar do mobile) */}
                                        <SafeAreaView style={StylesGlobal.safeAreaView}>
                                            <Navbar />
                                        </SafeAreaView>

                                        {/* Telas */}
                                        <Stack.Navigator initialRouteName={rotaInicial}>
                                            <Stack.Screen component={Splash} name='Splash' options={{ headerShown: false }} />
                                            <Stack.Screen component={Index} name='Index' options={{ headerShown: false, animation: 'fade' }} />
                                            <Stack.Screen component={Fila} name='Fila' options={{ headerShown: false, animation: 'simple_push' }} />
                                            <Stack.Screen component={PlayerFullScreen} name='PlayerFullScreen' options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                                            <Stack.Screen component={Playlist} name='Playlist' options={{ headerShown: false, animation: 'simple_push' }} />

                                            <Stack.Screen component={Login} name='Login' options={{ headerShown: false, animation: 'simple_push' }} />
                                        </Stack.Navigator>

                                        {/* Player e footer: esconder ambos quando a tela for PlayerFullScreen */}
                                        {/* É necessário esconder com css para que a música não pare! */}
                                        <View
                                            style={(rotaAtual === 'PlayerFullScreen') ? StylesGlobal.esconder : null}
                                            pointerEvents={(rotaAtual === 'Splash' ? 'none' : 'auto')}
                                        >
                                            <Player />
                                            <Footer rotaAtual={rotaAtual} />
                                        </View>
                                    </NavigationContainer>
                                </InfoMusicaProvider>
                            </MusicaProvider>
                        </ListaMusicasProvider>
                    </PlaylistsProvider>
                </UsuarioProvider>
            </View>

            {/* Toast message */}
            <Toast />
        </Fragment>
    );
}

