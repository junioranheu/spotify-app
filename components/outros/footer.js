import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/footer';
import Casa from '../svg/casa';
import Fila from '../svg/fila';
import Lupa from '../svg/lupa';

export default function Footer({ rotaAtual }) {
    const navigation = useNavigation();

    return (
        <View style={Styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                <View style={Styles.divIcone}>
                    <Casa height={24} width={24} cor={rotaAtual === 'Index' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'} />
                    <Text style={Styles.texto}>Início</Text>
                </View>
            </TouchableOpacity>

            <View style={Styles.divIcone}>
                <Lupa height={24} width={24} cor={rotaAtual === 'Buscar' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'} />
                <Text style={Styles.texto}>Buscar</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                <View style={Styles.divIcone}>
                    <Fila height={24} width={24} cor={rotaAtual === 'Fila' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'} />
                    <Text style={Styles.texto}>Sua fila</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

