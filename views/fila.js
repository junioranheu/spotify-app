import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../css/index';

export default function Fila({ navigation }) {
    return (
        <View style={Styles.container}>
            <Text style={Styles.titulo} onPress={() => navigation.navigate('Index')}>Fila</Text>
        </View>
    );
}

