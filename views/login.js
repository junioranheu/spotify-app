import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Botao from '../components/outros/botao';
import SpotifyLogo2 from '../components/svg/spotifyLogo2';
import Styles from '../css/login';
import AlbunsWebp from '../static/image/outros/albuns.webp';
import { UsuarioContext, UsuarioStorage } from '../utils/context/usuarioContext';
import CONSTANTS_USUARIOS from '../utils/data/constUsuarios';
import Aviso from '../utils/outros/aviso';

export default function Login({ navigation }) {
    const [usuarioContext, setUsuarioContext] = useContext(UsuarioContext); // Contexto do usuário;

    const refUsuario = useRef();
    const refSenha = useRef();
    const refBtn = useRef();

    const formDataInicial = { usuario: '', senha: '' };
    const [formData, setFormData] = useState(formDataInicial);
    function handleChange(valor, name) {
        // console.log(name);
        // console.log(e.nativeEvent.text);
        setFormData({ ...formData, [name]: valor });
    };

    async function handleSubmit(e) {
        refBtn.current.disabled = true;

        if (!formData || !formData.usuario || !formData.senha) {
            Aviso('success', 'Opa ✋', 'O nome de usuário e/ou e-mail estão vazios', 5000);
            refSenha.current.value = '';
            refUsuario.current.focus();
            refBtn.current.disabled = false;
            return false;
        }

        const url = `${CONSTANTS_USUARIOS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${formData.usuario}&senha=${formData.senha}`;
        // console.log(url);

        const resposta = await fetch(url);
        if (resposta.status !== 200) {
            refSenha.current.value = '';
            formData.senha = '';
            refUsuario.current.focus();
            refBtn.current.disabled = false;
            Aviso('success', 'Opa ✋', 'Provavelmente o usuário e/ou a senha estão errados', 5000);
            return false;
        }

        // Resposta em JSON;
        const usuario = await resposta.json();

        // Gerar token e autenticar/entrar;
        getToken(formData.usuario, formData.senha, usuario);
    };

    async function getToken(nomeUsuario, senha, usuario) {
        const url = `${CONSTANTS_USUARIOS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;

        // Gerar token;
        const resposta = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (resposta.status !== 200) {
            Aviso('success', 'Opa ✋', 'Algo deu errado ao se autenticar', 5000);
            return false;
        }

        // Resposta em JSON;
        const token = await resposta.json();
        console.log(token);

        // Inserir o token no json final para gravar localmente a sessão do login;
        usuario.token = token;
        UsuarioStorage.set(usuario);

        // Atribuir autenticação ao contexto de usuário;
        setUsuarioContext(usuario);

        // Voltar à tela principal;
        navigation.dispatch(StackActions.replace('Index'));
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    function setarInformacoesDev() {
        if (process.env.NODE_ENV === 'development') {
            // console.log('Setar infos para login rápido em dev');
            Aviso('success', 'process.env.NODE_ENV === "dev"', 'true 👾', 2000);
            formData.usuario = 'adm';
            formData.senha = '123';
        }
    }

    return (
        <KeyboardAvoidingView style={Styles.containerPrincipal} behavior='padding' enabled>
            <ImageBackground source={AlbunsWebp} style={Styles.backgroundImage}>
                <View style={[Styles.flexBottom, Styles.conteudo]}>
                    <LinearGradient
                        colors={['transparent', '#121212', '#121212', '#121212', '#121212', '#121212', '#121212', '#121212', '#121212']}
                        style={Styles.ajustarLinearGradient}
                    >
                        <View style={Styles.centralizar}>
                            <TouchableOpacity onPress={() => setarInformacoesDev()}>
                                <SpotifyLogo2 height={60} width={60} cor='rgba(255, 255, 255, 0.9)' />
                            </TouchableOpacity>

                            <Text style={[Styles.titulo, Styles.margemTopPequena]}>Milhões de músicas à sua escolha</Text>
                            <Text style={Styles.titulo}>Bem-vindo ao Spotify</Text>
                        </View>

                        <View style={Styles.margemGrande}>
                            <Text style={Styles.label}>Usuário</Text>
                            <TextInput
                                style={[Styles.input, Styles.margemTopSuperPequena]}
                                onChange={(e) => handleChange(e.nativeEvent.text?.toLowerCase(), 'usuario')}
                                placeholder='E-mail ou nome de usuário'
                                placeholderTextColor='rgba(0, 0, 0, 0.2)'
                                value={formData.usuario}
                                onKeyPress={(e) => handleKeyPress(e)}
                                ref={refUsuario}
                            />
                        </View>

                        <View style={Styles.margemTopPequena}>
                            <Text style={Styles.label}>Senha</Text>
                            <TextInput
                                style={[Styles.input, Styles.margemTopSuperPequena]}
                                onChange={(e) => handleChange(e.nativeEvent.text, 'senha')}
                                placeholder='Sua senha super-secreta'
                                placeholderTextColor='rgba(0, 0, 0, 0.2)'
                                secureTextEntry={true}
                                onKeyPress={(e) => handleKeyPress(e)}
                                ref={refSenha}
                            />
                        </View>

                        <View style={Styles.margemTop}>
                            <Botao
                                texto='Entrar'
                                corTexto='rgba(255, 255, 255, 0.8)'
                                corBotao='rgba(29, 185, 84, 0.8)'
                                corBotaoOnPress='rgba(29, 185, 84, 0.4)'
                                height={50}
                                width={300}
                                url='Index'
                                isExterno={false}
                                funcaoExtra={handleSubmit}
                                refBtn={refBtn}
                            />
                        </View>

                        {/* 1 > 2 para esconder div */}
                        {
                            1 > 2 && (
                                <View style={[Styles.margemTop, Styles.centralizar]}>
                                    <Text style={Styles.texto}>Por enquanto não é possível criar uma nova conta</Text>
                                    <Text style={Styles.texto}>Entre com o usuário <Text style={Styles.textoVerde}>usuario</Text> e a senha <Text style={Styles.textoVerde}>123</Text></Text>
                                </View>
                            )
                        }
                    </LinearGradient>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}
