import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import MargemBotFooter from '../components/outros/margemBotFooter';
import StylesGlobal from '../css/global';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';

export default function PlayerFullScreen({ navigation }) {
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            <Text onPress={() => navigation.navigate('Index')}>Oi</Text>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

