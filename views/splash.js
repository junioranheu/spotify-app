import { StackActions, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Styles from '../css/splash';
import SplashJson from '../static/lottieFiles/splash.json';
import NumeroAleatorio from '../utils/outros/numeroAleatorio';

// Tutorial splash: https://www.youtube.com/watch?v=ncA3eHZHXRc&ab_channel=CommunityCode;
export default function Splash() {
    const navigation = useNavigation();

    const refLottieView = useRef();
    useEffect(() => {
        // Aguardar x segundos para evitar bugs;
        const timeOut = window.setTimeout(() => {
            refLottieView?.current?.play();

            encerrarSplash();
        }, 100);

        return () => {
            // Unmount;
            window.clearTimeout(timeOut);
            refLottieView?.current?.reset();
        }
    }, []);

    function encerrarSplash() {
        // Aguardar x segundos para evitar bugs;
        const timeOut = window.setTimeout(() => {
            navigation.dispatch(StackActions.replace('Index'));
        }, NumeroAleatorio(1000, 3000));

        return () => window.clearTimeout(timeOut);
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



