import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import StylesGlobal from '../css/global';
import WaitGif from '../static/image/outros/wait.gif';
import Aviso from '../utils/outros/aviso';

export default function Historico({ navigation }) {

    useEffect(() => {
        Aviso('success', 'Opa 😞', 'Essa tela ainda não foi desenvolvida', 5000);
    }, []);

    return (
        <View style={[StylesGlobal.containerPrincipal, { flex: 'center', justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={WaitGif} style={StylesGlobal.gifWait}></Image>
        </View>
    );
}



