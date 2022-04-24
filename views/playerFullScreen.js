import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import FadeInOut from 'react-native-fade-in-out'; // https://www.npmjs.com/package/react-native-fade-in-out
import * as Progress from 'react-native-progress'; // https://www.npmjs.com/package/react-native-progress
import GestureRecognizer from 'react-native-swipe-gestures'; // https://www.npmjs.com/package/react-native-swipe-gestures
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
import { InfoMusicaContext } from '../utils/context/infoMusicaContext';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';
import formatarMilisegundos from '../utils/outros/formatarMilisegundos';
import NumeroAleatorio from '../utils/outros/numeroAleatorio';

export default function PlayerFullScreen({ navigation }) {
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;
    const [
        infoMusicaContext, setInfoMusicaContext,
        isModoAleatorioContext, setIsModoAleatorioContext,
        isModoLoopContext, setIsModoLoopContext
    ] = useContext(InfoMusicaContext); // Context da música que está tocando, contendo suas informações;
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
        // console.log(infoMusicaContext); // Todos os status;
        // console.log(infoMusicaContext?.status?.durationMillis); // Total ms;
        // console.log(infoMusicaContext?.status?.positionMillis); // Atual ms;

        // Calcular a porcentagem da música escutada para setar no progressbar;
        let porcentagemMusicaOuvidaCalculo = (infoMusicaContext?.status?.positionMillis / infoMusicaContext?.status?.durationMillis); // * 100
        porcentagemMusicaOuvidaCalculo = !porcentagemMusicaOuvidaCalculo ? 0 : Number(porcentagemMusicaOuvidaCalculo.toFixed(2));
        setPorcetagemMusicaOuvida(porcentagemMusicaOuvidaCalculo);
        // console.log(porcentagemMusicaOuvidaCalculo);
    }, [infoMusicaContext?.status]);

    // Play/pausar música ao clicar no ícone;
    async function handleIsPlaying() {
        if (infoMusicaContext?.status?.isPlaying) {
            await infoMusicaContext.sound.pauseAsync();
        } else {
            await infoMusicaContext.sound.playAsync();
        }
    }

    // Modo aleatório;
    function handleModoAleatorio() {
        setIsModoAleatorioContext(!isModoAleatorioContext);
    }

    // Avançar;
    const [listaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    async function handleAvancar() {
        // console.log(listaMusicasContext);

        //// **** Quando o usuário clicar para avançar, ignore o modo loop;
        // // Se o isModoLoopContext for true, volte para o início da mesma música;
        // // console.log(`playerFullScreen.js: ${isModoLoopContext}`);
        // if (isModoLoopContext) {
        //     await infoMusicaContext?.sound?.setPositionAsync(0);
        //     await infoMusicaContext?.sound?.playAsync();
        //     return false;
        // }

        if (!isPodeAvancar) {
            console.log('Não é possível avançar a música agora, aguarde um momento');
            return false;
        }

        if (listaMusicasContext?.length > 0) {
            // console.log(musicaContext.musicaId);
            let proximaMusica;

            // Caso o isModoAleatorioContext NÃO seja true, pegue o próximo, normalmente;
            if (!isModoAleatorioContext) {
                const index = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                proximaMusica = listaMusicasContext[index + 1]; // Avançar;
            }

            // Caso o isModoAleatorioContext seja true, o Avançar não pode ser simplesmente "+1";
            if (isModoAleatorioContext) {
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
            }, 2000);
        }
    }, [isPodeAvancar]);

    // Função de histórico da lista + função de voltar música;
    const [historicoListaMusicasContext, setHistoricoListaMusicasContext] = useState();
    useEffect(() => {
        // console.log('Histórico inicial copiado');
        const jsonFinal = [musicaContext].concat([...listaMusicasContext]);
        setHistoricoListaMusicasContext(jsonFinal);
    }, [listaMusicasContext]);

    function handleVoltar() {
        // console.log(historicoListaMusicasContext);
        // console.log(musicaContext.musicaId);

        if (!isPodeAvancar) {
            console.log('Não pode voltar a música agora, aguarde um momento');
            return false;
        }

        // Converter o objeto para array de objetos e concatenar com a música atual;
        // const arrayHistorico = [musicaContext].concat(Object.entries(historicoListaMusicasContext).map(e => e[1]));
        const arrayHistorico = Object.entries(historicoListaMusicasContext).map(e => e[1]);
        // console.log(arrayHistorico);

        if (arrayHistorico?.length > 0) {
            const index = arrayHistorico?.findIndex(m => m.musicaId == musicaContext?.musicaId);
            const proximaMusica = arrayHistorico[index - 1]; // Voltar;

            // console.log(index);
            // console.log(arrayHistorico);
            // console.log(proximaMusica);

            if (proximaMusica) {
                // Salvar no Context e no localStorage;
                MusicaStorage.set(proximaMusica);
                setMusicaContext(proximaMusica);

                // Não permitir voltar até que passe o x segundos;
                setIsPodeAvancar(false);
            } else {
                console.log('Sem música para voltar!');
            }
        }
    }

    // Modo loop;
    function handleModoLoop() {
        setIsModoLoopContext(!isModoLoopContext);
    }

    // Ao clicar no ProgressBar;
    async function handleClickProgressBar(e) {
        // console.log(e);
        // console.log(widthContainerPlayer);

        // Pegar o pageX "ponto clicado" dependendo do dispositivo;
        const pageX = (Platform.OS === 'web' ? e.pageX : e.nativeEvent.pageX);
        // console.log(pageX);

        // Descobrir o ponto clicado;
        const respaldo = 32; // Foi percebido que por algum motivo desconhecido existe 32px de diferença... ele deve ser descontado;
        let pontoClicado = pageX - respaldo;
        pontoClicado = pontoClicado < 0 ? 0 : pontoClicado;
        pontoClicado = pontoClicado > widthContainerPlayer ? widthContainerPlayer : pontoClicado;
        // console.log(pontoClicado);

        // Descobrir a porcentagem que esse ponto clicado representa;
        const porcentagemPontoClicado = pontoClicado / widthContainerPlayer;
        // console.log(porcentagemPontoClicado);

        // Descobrir quantos milisegundos da música atual essa porcentagem do ponto clicado representa;
        const milisegundosReferente = porcentagemPontoClicado * infoMusicaContext?.status?.durationMillis;
        // console.log(infoMusicaContext?.status?.durationMillis);
        // console.log(milisegundosReferente);

        // Setar o valor em milisegundos encontrados na música atual;
        await infoMusicaContext.sound.setPositionAsync(milisegundosReferente);
    }

    // GestureRecognizer;
    function handleSwipeDown(e) {
        // console.log(e);  
        // console.log('Swipe para baixo com a força necessária config/velocityThreshold');
        navigation.navigate((ultimaPaginaAberta.name ?? 'Index'))
    }

    return (
        <GestureRecognizer onSwipeDown={(e) => handleSwipeDown(e)} config={[{ velocityThreshold: 0.2, directionalOffsetThreshold: 100 }]}>
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
                            {/* <Text style={Styles.textoMuitoPequeno}>{musicaContext.albunsMusicas[0]?.albuns.nome}</Text> */}
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

                                <TouchableOpacity onPress={(e) => handleClickProgressBar(e)}>
                                    <Progress.Bar progress={porcetagemMusicaOuvida} animationType={'timing'} animated={true}
                                        height={5} width={widthContainerPlayer} color={'rgba(255, 255, 255, 0.8)'} borderWidth={0} borderRadius={10}
                                        unfilledColor={'#404131'}
                                    />
                                </TouchableOpacity>

                                <View style={[Styles.mesmaLinha, Styles.margemTopPequena]}>
                                    <Text style={Styles.spanTempoAtualProgressBar}>{formatarMilisegundos(infoMusicaContext?.status?.positionMillis)}</Text>
                                    <Text style={Styles.sapnTempoMaximoProgressBar}>{formatarMilisegundos(infoMusicaContext?.status?.durationMillis)}</Text>
                                </View>
                            </View>

                            {/* =-=-=-=-=-=-=-=-=-=-= Botões grandes =-=-=-=-=-=-=-=-=-=-= */}
                            <View style={[Styles.divBotoesGrandes, Styles.margemTop]}>
                                <TouchableOpacity onPress={() => handleModoAleatorio()}>
                                    <Aleatorio height={22} width={22} cor={isModoAleatorioContext ? '#20D660' : 'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleVoltar()}>
                                    <BotaoVoltar height={30} width={30} cor={'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleIsPlaying()}>
                                    <View style={Styles.circuloBotaoPlay}>
                                        {
                                            infoMusicaContext?.status?.isPlaying ? (
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

                                <TouchableOpacity onPress={() => handleModoLoop()}>
                                    <Loop height={22} width={22} cor={isModoLoopContext ? '#20D660' : 'rgba(255, 255, 255, 0.9)'} />
                                </TouchableOpacity>
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
        </GestureRecognizer>
    );
}

