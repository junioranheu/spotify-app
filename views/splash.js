import { StackActions, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Styles from '../css/splash';
import SplashJson from '../static/lottieFiles/splash.json';
import { PlaylistsContext } from '../utils/context/playlistsContext';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import Aviso from '../utils/outros/aviso';
import NumeroAleatorio from '../utils/outros/numeroAleatorio';

// Tutorial splash: https://www.youtube.com/watch?v=ncA3eHZHXRc&ab_channel=CommunityCode;
export default function Splash() {
    const navigation = useNavigation();
    const [playlistsContext, setPlaylistsContext] = useContext(PlaylistsContext); // Context das playlists disponiveis;

    const refLottieView = useRef();
    useEffect(() => {
        // Aguardar x segundos para evitar bugs;
        const timeOut = window.setTimeout(() => {
            refLottieView?.current?.play();

            // Pegar playlists para enviar para o index;
            getPlaylistsERedireciona();
        }, 100);

        return () => {
            // Unmount;
            window.clearTimeout(timeOut);
            refLottieView?.current?.reset();
        }
    }, []);

    async function getPlaylistsERedireciona() {
        fetch(CONSTANTS_PLAYLISTS.API_URL_GET_TODOS).then((response) => {
            if (response.ok) {
                return response.json();
            } 
        })
            .then((playlists) => {
                setPlaylistsContext(playlists);

                // Esperar x segundos para "enfeitar";
                const timeOut = window.setTimeout(() => {
                    navigation.dispatch(StackActions.replace('Index'));
                }, NumeroAleatorio(1000, 2000));

                return () => window.clearTimeout(timeOut);
            })
            .catch((error) => {
                Aviso('success', 'Opa ✋', 'Houve um problema ao se conectar no servidor', 10000);
            });
    }

    return (
        <View style={Styles.container}>
            <LottieView
                source={SplashJson}
                autoPlay
                ref={refLottieView}
                style={Styles.lottieView}
            />
        </View>
    );
}



