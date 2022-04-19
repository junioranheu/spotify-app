import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/footer';
import Biblioteca from '../svg/biblioteca';
import Casa from '../svg/casa';
import Lupa from '../svg/lupa';

export default function Footer() {
    const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                <View style={Styles.divIcone}>
                    <Casa height={24} width={24} cor='rgba(255, 255, 255, 0.6)' />
                    <Text style={Styles.texto}>Início</Text>
                </View>
            </TouchableOpacity>

            <View style={Styles.divIcone}>
                <Lupa height={24} width={24} cor='rgba(255, 255, 255, 0.6)' />
                <Text style={Styles.texto}>Buscar</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                <View style={Styles.divIcone}>
                    <Biblioteca height={24} width={24} cor='rgba(255, 255, 255, 0.6)' />
                    <Text style={Styles.texto}>Sua fila</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

