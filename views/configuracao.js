import { StackActions } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Botao from '../components/outros/botao';
import MargemBotFooter from '../components/outros/margemBotFooter';
import OpcaoConfiguracao from '../components/outros/opcaoConfiguracao';
import Styles from '../css/configuracao';
import StylesGlobal from '../css/global';
import { InfoMusicaContext } from '../utils/context/infoMusicaContext';
import { UsuarioContext, UsuarioStorage } from '../utils/context/usuarioContext';

export default function Configuracao({ navigation }) {
    const [usuarioContext, setUsuarioContext] = useContext(UsuarioContext); // Contexto do usuário;
    const [infoMusicaContext] = useContext(InfoMusicaContext); // Context da música que está tocando, contendo suas informações;

    async function deslogar() {
        // Apagar do local storage e do context;
        UsuarioStorage.delete();
        setUsuarioContext(null);

        // "Parar" música;
        if (infoMusicaContext?.status?.isPlaying) {
            await infoMusicaContext?.sound?.pauseAsync();
        }

        // Voltar à tela principal;
        navigation.dispatch(StackActions.replace('Index'));
    }

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            <View style={Styles.container}>
                <OpcaoConfiguracao texto='Conta' url='Configuracao' isPrimeiro={true} />
                <OpcaoConfiguracao texto='Economia de dados' url='Configuracao' />
                <OpcaoConfiguracao texto='Idiomas' url='Configuracao' />
                <OpcaoConfiguracao texto='Reprodução' url='Configuracao' />
                <OpcaoConfiguracao texto='Conteúdo explícito' url='Configuracao' />
                <OpcaoConfiguracao texto='Dispositivos' url='Configuracao' />
                <OpcaoConfiguracao texto='Carro' url='Configuracao' />
                <OpcaoConfiguracao texto='Redes sociais' url='Configuracao' />
                <OpcaoConfiguracao texto='Assistentes de voz e aplicativos' url='Configuracao' />
                <OpcaoConfiguracao texto='Qualidade do áudio' url='Configuracao' />
                <OpcaoConfiguracao texto='Qualidade de vídeo' url='Configuracao' />
                <OpcaoConfiguracao texto='Armazenamento' url='Configuracao' />
                <OpcaoConfiguracao texto='Notificações' url='Configuracao' />
                <OpcaoConfiguracao texto='Arquivos locais' url='Configuracao' />
                <OpcaoConfiguracao texto='Sobre' url='Configuracao' />
            </View>

            <View style={[Styles.centralizar, Styles.margemTop]}>
                <Botao
                    texto='Sair'
                    corTexto='rgba(255, 255, 255, 0.8)'
                    corBotao='rgba(29, 185, 84, 0.8)'
                    corBotaoOnPress='rgba(29, 185, 84, 0.4)'
                    height={50}
                    width={300}
                    url=''
                    isExterno={false}
                    funcaoExtra={deslogar}
                    refBtn={null}
                />
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}



