import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SetinhaBaixo2 from '../../components/svg/setinhaBaixo2';
import Styles from '../../css/configuracao';

export default function OpcaoConfiguracao({ texto, url, isPrimeiro }) {
    const navigation = useNavigation();

    return (
        <View style={(!isPrimeiro ? Styles.margemTop : null)}>
            <TouchableOpacity style={Styles.mesmaLinha} onPress={() => navigation.navigate(url)}>
                <Text style={Styles.textoOpcao}>{texto}</Text>
                <SetinhaBaixo2 height={15} width={15} cor='rgba(255, 255, 255, 0.6)' isRotate={false} />
            </TouchableOpacity>
        </View>
    );
}

