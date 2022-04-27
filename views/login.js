import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import Botao from '../components/outros/botao';
import SpotifyLogo2 from '../components/svg/spotifyLogo2';
import StylesGlobal from '../css/global';
import Styles from '../css/login';

export default function Login({ navigation }) {

    const [usuario, setUsuario] = useState(null);
    const [senha, setSenha] = useState(null);

    return (
        <KeyboardAvoidingView style={[StylesGlobal.containerPrincipal, Styles.centralizar]} behavior='padding' enabled>
            <View style={Styles.centralizar}>
                <SpotifyLogo2 height={60} width={60} cor='rgba(255, 255, 255, 0.9)' />
                <Text style={[Styles.titulo, Styles.margemTopPequena]}>Milhões de músicas à sua escolha</Text>
                <Text style={Styles.titulo}>Bem-vindo ao Spotify</Text>
            </View>

            <View style={Styles.margemGrande}>
                <Text style={Styles.label}>Usuário</Text>
                <TextInput
                    style={[Styles.input, Styles.margemTopSuperPequena]}
                    onChangeText={() => setUsuario()}
                    value={usuario}
                    placeholder='E-mail ou nome de usuário'
                    placeholderTextColor='rgba(0, 0, 0, 0.2)'
                />
            </View>

            <View style={Styles.margemTopPequena}>
                <Text style={Styles.label}>Senha</Text>
                <TextInput
                    style={[Styles.input, Styles.margemTopSuperPequena]}
                    onChangeText={() => setSenha()}
                    value={senha}
                    placeholder='Sua senha super-secreta'
                    placeholderTextColor='rgba(0, 0, 0, 0.2)'
                />
            </View>

            <View style={Styles.margemTop}>
                <Botao texto='Entrar'
                    corTexto='rgba(255, 255, 255, 0.8)'
                    corBotao='rgba(29, 185, 84, 0.8)'
                    corBotaoOnPress='rgba(29, 185, 84, 0.4)'
                    height={50}
                    width={300}
                    url='Index'
                    isExterno={false}
                    funcaoExtra={null}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

