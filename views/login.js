import React from 'react';
import { Text, View } from 'react-native';
import StylesGlobal from '../css/global';
import Styles from '../css/index';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Login({ navigation }) {
    
    function gerarOla() {
        var hora = HorarioBrasilia().hour();
        // console.log(hora);
        var msg = '';

        if (hora >= 5 && hora < 12) {
            msg = 'Bom dia';
        } else if (hora >= 12 && hora < 18) {
            msg = 'Boa tarde';
        } else {
            msg = 'Boa noite';
        }

        return msg;
    }

    return (
        <View style={StylesGlobal.containerPrincipal}>
            {/* Olá + Ícones */}
            <View style={Styles.divOla}>
                <Text style={Styles.titulo}>{gerarOla()}</Text>
            </View>
        </View>
    );
}

