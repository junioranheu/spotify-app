import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Engrenagem from '../components/svg/engrenagem';
import Historico from '../components/svg/historico';
import Notificacao from '../components/svg/notificacao';
import StylesGlobal from '../css/global';
import Styles from '../css/index';

export default function Playlist({ route, navigation }) {
    const { playlistId } = route.params;
    console.log(playlistId);

    function gerarOla() {
        var msg = 'Boa noite';
        return msg;
    }

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            <View style={Styles.divOla}>
                <Text style={Styles.titulo}>{gerarOla()}</Text>

                <View style={Styles.direita}>
                    <Notificacao height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.espacoIcones}></View>
                    <Historico height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.espacoIcones}></View>
                    <Engrenagem height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                </View>
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

