import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../../css/footer';
import Casa from '../svg/casa';

export default function Footer() {
    return (
        <View style={Styles.container}>
            <View style={Styles.divIcone}>
                <Casa height={24} width={24} cor='#fff' />
                <Text style={Styles.texto}>Início</Text>
            </View>

            <Text style={Styles.texto}>Buscar</Text>
            <Text style={Styles.texto}>Sua fila</Text>
        </View>
    );
}

