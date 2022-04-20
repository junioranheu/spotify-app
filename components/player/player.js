import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/player';
import Foto6 from '../../static/image/albunsPequenos/albumPequeno6.webp';
import BotaoPlay from '../svg/botaoPlay';
import Dispositivo from '../svg/dispositivo';
 
export default function Player() {
    return (
        <View style={Styles.container}>
            <View style={Styles.player}>
                <View style={Styles.esquerda}>
                    <Image source={Foto6} style={Styles.imageBackground}></Image>

                    <View style={Styles.divInfoMusica}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.tituloMusica}>Nome da música aqui</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>Nome da banda aqui</Text>
                    </View>
                </View>

                <View style={Styles.direita}>
                    <Dispositivo height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.margemDireita}></View>
                    <BotaoPlay height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.margemDireita}></View>
                </View>
            </View>
        </View>
    );
}

