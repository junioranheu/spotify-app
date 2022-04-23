import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FadeInOut from 'react-native-fade-in-out'; // https://www.npmjs.com/package/react-native-fade-in-out
import { PanGestureHandler } from 'react-native-gesture-handler'; // https://stackoverflow.com/questions/58939431/detect-swipe-direction-using-react-native-gesture-handler-and-reanimated & https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh/; 
import MargemBotFooter from '../components/outros/margemBotFooter';
import Aleatorio from '../components/svg/aleatorio';
import BotaoAvancar from '../components/svg/botaoAvancar';
import BotaoPlay from '../components/svg/botaoPlay';
import BotaoVoltar from '../components/svg/botaoVoltar';
import Coracao from '../components/svg/coracao';
import CoracaoPreenchido from '../components/svg/coracaoPreenchido';
import Dispositivo from '../components/svg/dispositivo';
import Fila from '../components/svg/fila';
import Loop from '../components/svg/loop';
import Reticencias from '../components/svg/reticencias';
import SetinhaBaixo2 from '../components/svg/setinhaBaixo2';
import Styles from '../css/playerFullScreen';
import ImgCinza from '../static/image/outros/cinza.webp';
import { MusicaContext } from '../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';

export default function PlayerFullScreen({ navigation }) {
    const [musicaContext] = useContext(MusicaContext); // Context da música;

    // https://stackoverflow.com/questions/55942600/how-to-get-previous-route-name-from-react-navigation;
    const routes = navigation.getState()?.routes;
    const ultimaPaginaAberta = routes[routes.length - 2];

    // Imagem da banda e cores dominantes;
    const [imagemBanda, setImagemBanda] = useState(null);
    const [coresDominantes, setCoresDominantes] = useState(null);
    useEffect(() => {
        // Import dinâmico: capa da música reproduzindo;
        if (musicaContext.musicasBandas[0]?.bandas.foto) {
            // console.log('Entrou aqui com o nome de ' + foto);
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${musicaContext.musicasBandas[0]?.bandas.foto}`;
            setImagemBanda(img);
        }

        // Pegar a cor dominante;
        if (musicaContext?.musicasBandas[0]?.bandas.corDominante) {
            const corRgba = musicaContext?.musicasBandas[0]?.bandas.corDominante;

            var tudoAntesUltimaVirgula = corRgba.substr(0, corRgba.lastIndexOf(','));
            const corMedia = `${tudoAntesUltimaVirgula}, 0.4)`;
            const corClara = `${tudoAntesUltimaVirgula}, 0.1)`;

            // console.log({corRgba, corMedia, corClara})
            setCoresDominantes({ corRgba, corMedia, corClara });
        }
    }, [musicaContext]);

    // Detectar gesto (swipe);
    function handleGesture(e) {
        const { nativeEvent } = e;
        // console.log(nativeEvent);

        if (nativeEvent.velocityY > 1100) {
            // console.log('Swipe para baixo com força');
            navigation.navigate((ultimaPaginaAberta.name ?? 'Index'))
        } else {
            // console.log('Swipe para cima');
        }
    };

    // Exibir conteúdo bottom;
    const [isExibirConteudo, setIsExibirConteudo] = useState(false);
    useEffect(() => {
        setTimeout(function () {
            setIsExibirConteudo(true);
        }, 500);
    }, []);

    // Curtir;
    const [isCurtido, setIsCurtido] = useState(false);
    function handleCurtir() {
        setIsCurtido(!isCurtido);
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={Styles.containerPrincipal}>
                <LinearGradient
                    colors={(coresDominantes ? [coresDominantes.corRgba, '#121212', '#121212', '#121212'] : ['#121212', '#121212'])}
                    style={{ flex: 1, padding: 15 }}
                >
                    {/* #01 - Ícones de cima */}
                    <View style={Styles.mesmaLinha}>
                        <TouchableOpacity style={Styles.flexEsquerda} onPress={() => navigation.navigate((ultimaPaginaAberta.name ?? 'Index'))}>
                            <SetinhaBaixo2 height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.flexCentro}>
                            <Text style={Styles.textoMuitoPequeno}>Nome do album aqui</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.flexDireita}>
                            <Reticencias height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                        </TouchableOpacity>
                    </View>

                    {/* #02 - Imagem */}
                    <View style={[Styles.centralizar, Styles.margemTopGrande]}>
                        {
                            imagemBanda ? (
                                <Image source={{ uri: imagemBanda }} style={Styles.imageBackground}></Image>
                            ) : (
                                <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                            )
                        }
                    </View>

                    {/* #02 - Outros elementos */}
                    <View style={[Styles.divOutrosElementos, Styles.margemTopGrande]}>
                        <FadeInOut visible={isExibirConteudo} duration={1000}>
                            {/* =-=-=-=-=-=-=-=-=-=-= Informações =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={Styles.mesmaLinha}>
                                <View>
                                    <Text style={Styles.tituloMusica}>{musicaContext?.nome}</Text>
                                    <Text style={Styles.nomeBanda}>{musicaContext.musicasBandas[0]?.bandas.nome}</Text>
                                </View>

                                <View style={Styles.flexDireita}>
                                    <TouchableOpacity onPress={() => handleCurtir()}>
                                        {
                                            isCurtido ? (
                                                <CoracaoPreenchido height={24} width={24} cor={'#20D660'} />
                                            ) : (
                                                <Coracao height={24} width={24} cor={'rgba(255, 255, 255, 0.9)'} />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Progressbar =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={Styles.margemTop}>
                                <Text style={Styles.texto}>Progressbar</Text>
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Botões grandes =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={[Styles.divBotoesGrandes, Styles.margemTop]}>
                                <Aleatorio height={24} width={24} cor={'rgba(255, 255, 255, 0.9)'} />
                                <BotaoVoltar height={30} width={30} cor={'rgba(255, 255, 255, 0.9)'} />

                                <View style={Styles.circuloBotaoPlay}>
                                    <BotaoPlay height={30} width={30} cor={'rgba(0, 0, 0, 0.85)'} />
                                </View>

                                <BotaoAvancar height={30} width={30} cor={'rgba(255, 255, 255, 0.9)'} />
                                <Loop height={24} width={24} cor={'rgba(255, 255, 255, 0.9)'} />
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Botões pequenos =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={[Styles.divBotoesPequenos, Styles.margemTop]}>
                                <Dispositivo height={24} width={24} cor={'rgba(255, 255, 255, 0.9)'} />

                                <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                                    <Fila height={24} width={24} cor={'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>
                            </View>
                        </FadeInOut>
                    </View>

                    {/* Margem do footer */}
                    <MargemBotFooter />
                </LinearGradient>
            </View>
        </PanGestureHandler>
    );
}

