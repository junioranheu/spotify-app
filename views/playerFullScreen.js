import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FadeInOut from 'react-native-fade-in-out'; // https://www.npmjs.com/package/react-native-fade-in-out
import { PanGestureHandler } from 'react-native-gesture-handler'; // https://stackoverflow.com/questions/58939431/detect-swipe-direction-using-react-native-gesture-handler-and-reanimated & https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh/; 
import MargemBotFooter from '../components/outros/margemBotFooter';
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

    const [isExibirConteudo, setIsExibirConteudo] = useState(false);
    useEffect(() => {
        setTimeout(function () {
            setIsExibirConteudo(true);
        }, 100);
    }, []);

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={Styles.containerPrincipal}>
                <LinearGradient
                    colors={(coresDominantes ? [coresDominantes.corRgba, coresDominantes.corMedia, coresDominantes.corClara] : ['#121212', '#121212'])}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={{ flex: 1, padding: 15 }}
                >
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

                    <View style={[Styles.centralizar, Styles.margemTopGrande]}>
                        {
                            imagemBanda ? (
                                <Image source={{ uri: imagemBanda }} style={Styles.imageBackground}></Image>
                            ) : (
                                <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                            )
                        }
                    </View>

                    <FadeInOut visible={isExibirConteudo} duration={1000}>
                        <View style={Styles.fixarBot}>
                            <View>
                                <Text style={Styles.texto}>{musicaContext?.nome}</Text>
                                <Text style={Styles.texto}>{musicaContext.musicasBandas[0]?.bandas.nome}</Text>
                            </View>

                            <View>
                                <Text style={Styles.texto}>Progressbar</Text>
                            </View>

                            <View>
                                <Text style={Styles.texto}>Botoes grandes</Text>
                            </View>

                            <View>
                                <Text style={Styles.texto}>Botoes pequenos</Text>
                            </View>

                            {/* Margem do footer */}
                            <MargemBotFooter />
                        </View>
                    </FadeInOut>
                </LinearGradient>
            </View>
        </PanGestureHandler>
    );
}

