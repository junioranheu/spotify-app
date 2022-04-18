import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Navbar from '../components/outros/navbar';
import Styles from '../css/app';

export default function Fila({ navigation }) {

    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <Navbar />

            <View style={Styles.container}>
                <Text style={Styles.titulo}>Fila</Text>
            </View>
        </SafeAreaView>
    );
}

