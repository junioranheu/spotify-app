import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, Text, TouchableHighlight } from 'react-native';

export default function Botao({ texto, corTexto, corBotao, corBotaoOnPress, height, width, url, isExterno, funcaoExtra }) {
    const navigation = useNavigation();

    function handlePress() {
        // Se o botão tiver o props "funcaoExtra" significa que deve ser executado uma outra função;
        if (funcaoExtra) {
            funcaoExtra();
        } else {
            // Se botão não tiver o pros "funcaoExtra", ele abre uma url;
            if (!url) {
                return false;
            }

            if (isExterno) {
                // Abrir no navegador;
                Linking.openURL(url);
            } else {
                // Redirecionar no app;
                navigation.navigate(url);
            }
        }
    }

    return (
        <TouchableHighlight
            onPress={() => handlePress()}
            activeOpacity={0.6} underlayColor={corBotaoOnPress}
            style={{ height: height, width: width, borderRadius: 50, backgroundColor: corBotao, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ color: corTexto, fontWeight: '700' }}>
                {texto}
            </Text>
        </TouchableHighlight>
    );
}

