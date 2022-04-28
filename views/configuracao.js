import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Styles from '../css/configuracao';
import StylesGlobal from '../css/global';

export default function Configuracao(navigation, route) {
    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            <View style={Styles.container}>
                <Text>aaaaa</Text>
            </View>
        </ScrollView>
    );
}



