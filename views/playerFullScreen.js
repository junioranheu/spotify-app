import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FadeInOut from 'react-native-fade-in-out'; // https://www.npmjs.com/package/react-native-fade-in-out
import { PanGestureHandler } from 'react-native-gesture-handler'; // https://stackoverflow.com/questions/58939431/detect-swipe-direction-using-react-native-gesture-handler-and-reanimated & https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh/; 
import * as Progress from 'react-native-progress'; // https://www.npmjs.com/package/react-native-progress
import MargemBotFooter from '../components/outros/margemBotFooter';
import Aleatorio from '../components/svg/aleatorio';
import BotaoAvancar from '../components/svg/botaoAvancar';
import BotaoPlay from '../components/svg/botaoPlay';
import BotaoStop from '../components/svg/botaoStop';
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
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import { MusicaPlayingContext } from '../utils/context/musicaPlayingContext';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';
import NumeroAleatorio from '../utils/outros/numeroAleatorio';

export default function PlayerFullScreen({ navigation }) {
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;
    const [musicaPlayingContext] = useContext(MusicaPlayingContext); // Context da música que está tocando, contendo suas informações;
    const [widthContainerPlayer, setWidthContainerPlayer] = useState();

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

    // Infos da música em questão (atualiza a cada 100ms);
    const [porcetagemMusicaOuvida, setPorcetagemMusicaOuvida] = useState(0);
    useEffect(() => {
        // console.log(musicaPlayingContext); // Todos os status;
        // console.log(musicaPlayingContext?.status?.durationMillis); // Total ms;
        // console.log(musicaPlayingContext?.status?.positionMillis); // Atual ms;

        // Calcular a porcentagem da música escutada para setar no progressbar;
        let porcentagemMusicaOuvidaCalculo = (musicaPlayingContext?.status?.positionMillis / musicaPlayingContext?.status?.durationMillis); // * 100
        porcentagemMusicaOuvidaCalculo = !porcentagemMusicaOuvidaCalculo ? 0 : Number(porcentagemMusicaOuvidaCalculo.toFixed(2));
        setPorcetagemMusicaOuvida(porcentagemMusicaOuvidaCalculo);
        // console.log(porcentagemMusicaOuvidaCalculo);
    }, [musicaPlayingContext?.status]);

    // Play/pausar música ao clicar no ícone;
    async function handleIsPlaying() {
        if (musicaPlayingContext?.status?.isPlaying) {
            await musicaPlayingContext.sound.pauseAsync();
        } else {
            await musicaPlayingContext.sound.playAsync();
        }
    }

    // Modo aleatório;
    const [isModoAleatorio, setIsModoAleatorio] = useState(false);
    function handleModoAleatorio() {
        setIsModoAleatorio(!isModoAleatorio);
    }

    // Avançar;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    function handleAvancar() {
        // console.log(listaMusicasContext);

        if (!isPodeAvancar) {
            console.log('Não é possível avançar a música agora, aguarde um momento');
            return false;
        }

        if (listaMusicasContext?.length > 0) {
            // console.log(musicaContext.musicaId);
            let proximaMusica;

            // Caso o isModoAleatorio NÃO seja true, pegue o próximo, normalmente;
            if (!isModoAleatorio) {
                const index = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                proximaMusica = listaMusicasContext[index + 1]; // Avançar;
            }

            // Caso o isModoAleatorio seja true, o Avançar não pode ser simplesmente "+1";
            if (isModoAleatorio) {
                const listaLenght = listaMusicasContext?.length;
                const random = NumeroAleatorio(0, listaLenght - 1);
                // console.log(random);
                proximaMusica = listaMusicasContext[random];
            }

            // Caso "proximaMusica" esteja vazia, pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('Não existe index + 1... voltar para o 0');
                proximaMusica = listaMusicasContext[0];
            }

            // console.log(proximaMusica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(proximaMusica);
            setMusicaContext(proximaMusica);

            // Não permitir avançar até que passe o x segundos;
            setIsPodeAvancar(false);
        }
    }

    useEffect(() => {
        // Aguardar x segundos para poder avançar novamente, para evitar bugs;
        if (!isPodeAvancar) {
            setTimeout(function () {
                setIsPodeAvancar(true);
            }, 1000);
        }
    }, [isPodeAvancar]);

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={Styles.containerPrincipal}>
                <LinearGradient
                    colors={(coresDominantes ? [coresDominantes.corRgba, '#121212', '#121212', '#121212'] : ['#121212', '#121212'])}
                    style={{ flex: 1, padding: 15 }}
                >
                    {/* #01 - Ícones de cima */}
                    <View style={Styles.mesmaLinha}>
                        <TouchableOpacity style={[Styles.flexEsquerda, Styles.margemEsquerdaPequena]} onPress={() => navigation.navigate((ultimaPaginaAberta.name ?? 'Index'))}>
                            <SetinhaBaixo2 height={20} width={20} cor='rgba(255, 255, 255, 0.6)' />
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.flexCentro}>
                            <Text style={Styles.textoMuitoPequeno}>Nome do album aqui</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.flexDireita, Styles.margemDireitaPequena]}>
                            <Reticencias height={20} width={20} cor='rgba(255, 255, 255, 0.6)' />
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
                                                <CoracaoPreenchido height={22} width={22} cor={'#20D660'} />
                                            ) : (
                                                <Coracao height={22} width={22} cor={'rgba(255, 255, 255, 0.9)'} />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Progressbar =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={Styles.margemTop}
                                onLayout={(event) => {
                                    var { x, y, width, height } = event.nativeEvent.layout;
                                    // console.log(width);
                                    setWidthContainerPlayer(width);
                                }}>

                                <Progress.Bar progress={porcetagemMusicaOuvida} animationType={'timing'}
                                    height={4} width={widthContainerPlayer} color={'rgba(255, 255, 255, 0.8)'} borderWidth={0} borderRadius={10}
                                />
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Botões grandes =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={[Styles.divBotoesGrandes, Styles.margemTop]}>
                                <TouchableOpacity onPress={() => handleModoAleatorio()}>
                                    <Aleatorio height={22} width={22} cor={isModoAleatorio ? '#20D660' : 'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>

                                <BotaoVoltar height={30} width={30} cor={'rgba(255, 255, 255, 0.9)'} />

                                <TouchableOpacity onPress={() => handleIsPlaying()}>
                                    <View style={Styles.circuloBotaoPlay}>
                                        {
                                            musicaPlayingContext?.status?.isPlaying ? (
                                                <BotaoStop height={30} width={30} cor={'rgba(0, 0, 0, 0.85)'} />
                                            ) : (
                                                <BotaoPlay height={30} width={30} cor={'rgba(0, 0, 0, 0.85)'} />
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleAvancar()}>
                                    <BotaoAvancar height={30} width={30} cor={'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>

                                <Loop height={22} width={22} cor={'rgba(255, 255, 255, 0.9)'} />
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Botões pequenos =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={[Styles.divBotoesPequenos, Styles.margemTop]}>
                                <Dispositivo height={22} width={22} cor={'rgba(255, 255, 255, 0.9)'} />

                                <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                                    <Fila height={22} width={22} cor={'rgba(255, 255, 255, 0.9)'} />
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

