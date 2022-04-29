import React, { Fragment, useRef } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Styles from '../css/buscar';
import StylesGlobal from '../css/global';

export default function Buscar({ navigation }) {
    const refInputBuscar = useRef();

    function handleChange(e) {
        console.log(e.nativeEvent.text);
    }

    return (
        <Fragment>
            {/* Parte superior */}
            <View style={Styles.divInputProcurar}>
                <TextInput
                    style={Styles.input}
                    onChange={(e) => handleChange(e)}
                    placeholder='Buscar'
                    placeholderTextColor='rgba(255, 255, 255, 0.8)'
                    ref={refInputBuscar}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Index')} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Text style={Styles.textoDois}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            {
                1 === 1 ? (
                    // Caso não tenha nenhum resultado
                    <View style={[StylesGlobal.containerPrincipal, Styles.centralizar]}>
                        <Text style={Styles.textoUm}>Encontre o que você quer ouvir</Text>
                        <Text style={[Styles.textoDois, Styles.margemTopPequena]}>Busque artistas, músicas, podcasts e muito mais.</Text>

                        {/* Margem do footer */}
                        <MargemBotFooter />
                    </View>
                ) : (
                    // Caso tenham resultados
                    <ScrollView style={StylesGlobal.containerPrincipal}>
                        <View style={Styles.centralizar}>
                            <Text style={Styles.textoUm}>xxx</Text>
                        </View>

                        {/* Margem do footer */}
                        <MargemBotFooter />
                    </ScrollView>
                )
            }
        </Fragment>
    );
}



