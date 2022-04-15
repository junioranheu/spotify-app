import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../../css/navbar';

export default function App() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.texto}>Navbar aqui</Text>
        </View>
    );
}

