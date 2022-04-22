import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler'; // https://stackoverflow.com/questions/58939431/detect-swipe-direction-using-react-native-gesture-handler-and-reanimated & https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh/; 
import MargemBotFooter from '../components/outros/margemBotFooter';
import Reticencias from '../components/svg/reticencias';
import SetinhaBaixo2 from '../components/svg/setinhaBaixo2';
import StylesGlobal from '../css/global';
import Styles from '../css/playerFullScreen';
import ImgCinza from '../static/image/outros/cinza.webp';
import { MusicaContext } from '../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';

export default function PlayerFullScreen({ navigation }) {
    const [musicaContext] = useContext(MusicaContext); // Context da música;

    // https://stackoverflow.com/questions/55942600/how-to-get-previous-route-name-from-react-navigation;
    const routes = navigation.getState()?.routes;
    const ultimaPaginaAberta = routes[routes.length - 2];

    // Imagem da banda
    const [imagemBanda, setImagemBanda] = useState(null);
    useEffect(() => {
        // Import dinâmico: capa da música reproduzindo;
        if (musicaContext.musicasBandas[0]?.bandas.foto) {
            // console.log('Entrou aqui com o nome de ' + foto);
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${musicaContext.musicasBandas[0]?.bandas.foto}`;
            setImagemBanda(img);
        }
    }, [musicaContext]);

    // Esperar x segundos para exibir conteúdo de baixo;
    const [isMostrarConteudo, setsMostrarConteudo] = useState(false);
    useEffect(() => {
        setTimeout(function () {
            setsMostrarConteudo(true);
        }, 1000);
    }, []);

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

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={StylesGlobal.containerPrincipal}>
                <View style={Styles.mesmaLinha}>
                    <TouchableOpacity onPress={() => navigation.navigate((ultimaPaginaAberta.name ?? 'Index'))}>
                        <SetinhaBaixo2 height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={Styles.textoMuitoPequeno}>Nome do album aqui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
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

                {
                    isMostrarConteudo && (
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
                    )
                }
            </View>
        </PanGestureHandler>
    );
}

