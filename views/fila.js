import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../css/fila';
import StylesGlobal from '../css/global';

export default function Fila({ navigation }) {
    return (
        <View style={StylesGlobal.containerPrincipal}>
            <Text style={Styles.titulo} onPress={() => navigation.navigate('Index')}>Fila</Text>
        </View> 
    );
}

