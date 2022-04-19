import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../../css/footer';

export default function Footer() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.texto}>Início</Text>
            <View style={Styles.margemDireita}></View>
            <Text style={Styles.texto}>Buscar</Text>
            <View style={Styles.margemDireita}></View>
            <Text style={Styles.texto}>Sua fila</Text>
        </View>
    );
}

