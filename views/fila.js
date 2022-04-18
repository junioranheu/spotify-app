import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Styles from '../css/app';

export default function Fila({ navigation }) {

    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <View style={Styles.container}>
                <Text style={Styles.titulo}>Fila</Text>
            </View>
        </SafeAreaView>
    );
}

