import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // https://docs.expo.dev/versions/latest/sdk/audio/
import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress'; // https://www.npmjs.com/package/react-native-progress
import TextTicker from 'react-native-text-ticker'; // https://www.npmjs.com/package/react-native-text-ticker
import Styles from '../../css/player';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { InfoMusicaContext } from '../../utils/context/infoMusicaContext';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_MUSICAS from '../../utils/data/constMusicas';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import Aviso from '../../utils/outros/aviso';
import NumeroAleatorio from '../../utils/outros/numeroAleatorio';
import BotaoPlay from '../svg/botaoPlay';
import BotaoStop from '../svg/botaoStop';
import Dispositivo from '../svg/dispositivo';

export default function Player() {
    const navigation = useNavigation();

    const [usuarioContext] = useContext(UsuarioContext); // Contexto do usuário;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [
        infoMusicaContext, setInfoMusicaContext,
        isModoAleatorioContext, setIsModoAleatorioContext,
        isModoLoopContext, setIsModoLoopContext
    ] = useContext(InfoMusicaContext); // Context da música que está tocando, contendo suas informações;

    const [widthContainerPlayer, setWidthContainerPlayer] = useState();
    const [imagemBanda, setImagemBanda] = useState(null);

    // Ao alterar a música em musicaContext importe dinamicamente;
    const [coresDominantes, setCoresDominantes] = useState(null);
    useEffect(() => {
        // console.log(musicaContext);
        async function importDinamico() {
            // Importar música dinamicamente;
            const urlMusica = `${CONSTANTS_UPLOAD.API_URL_GET_MUSIC}/${musicaContext.musicaId}.mp3`;
            // console.log(urlMusica);

            // Permitir tocar em modo silencioso, ficar ativo ao minimizar, etc: https://docs.expo.dev/versions/latest/sdk/audio/;
            // await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                playThroughEarpieceAndroid: false
            });

            try {
                // Descarregar música "anterior"; 
                await infoMusicaContext?.sound?.unloadAsync();
                // console.log('Música descarregada');
            } finally {
                // "Criar" música e tocar automáticamente (shouldPlay: true);
                const { sound } = await Audio.Sound.createAsync(
                    { uri: urlMusica },
                    { shouldPlay: true, isLooping: false, playsInSilentModeIOS: true },
                    (status) => {
                        // Setar em "setInfoMusicaContext" o status (informações da música atual) + sound (a música em si);
                        const jsonFinal = {
                            status: status,
                            sound: sound
                        }

                        // Setar valores (status) em uma variável context para ser usada aqui e em outras telas;
                        setInfoMusicaContext(jsonFinal);
                    }
                );

                // Log;
                console.log(`Música "${musicaContext.nome}" (${musicaContext.musicaId}) importada`);

                // Quando a música for importada, é necessário removê-la da lista/fila;
                if (listaMusicasContext.length > 0) {
                    const indexMusicaTocando = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);

                    if (indexMusicaTocando !== null) {
                        listaMusicasContext?.splice(indexMusicaTocando, 1);
                        ListaMusicasStorage.set(listaMusicasContext);
                        setListaMusicasContext(listaMusicasContext);
                    }
                }

                // Depois de tudo, incremente mais um ouvinte a música em questão;
                postIncrementarOuvinte();
            }
        }

        async function getImagemCapaMusica() {
            // Atribuir a imagem da música atual;
            if (musicaContext?.musicasBandas[0]?.bandas.foto) {
                const urlImg = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${musicaContext?.musicasBandas[0]?.bandas.foto}`;
                setImagemBanda(urlImg);

                // Pegar a cor dominante;
                if (musicaContext?.musicasBandas[0]?.bandas.corDominante) {
                    const corRgba = musicaContext?.musicasBandas[0]?.bandas.corDominante;

                    var tudoAntesUltimaVirgula = corRgba.substr(0, corRgba.lastIndexOf(','));
                    const corMedia = `${tudoAntesUltimaVirgula}, 0.6)`;
                    const corClara = `${tudoAntesUltimaVirgula}, 0.3)`;

                    // console.log({corRgba, corMedia, corClara})
                    setCoresDominantes({ corRgba, corMedia, corClara });
                }
            }
        }

        // Inserir mais um ouvinte;
        async function postIncrementarOuvinte() {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            await fetch(`${CONSTANTS_MUSICAS.API_URL_POST_INCREMENTAR_OUVINTE}?musicaId=${musicaContext.musicaId}`, requestOptions);
        }

        // Import dinâmico;
        if (musicaContext?.musicaId > 0 && usuarioContext?.usuarioId > 0) {
            // Atribuir a imagem da música atual;
            if (musicaContext?.musicasBandas[0]?.bandas.foto) {
                getImagemCapaMusica();
            }

            // Importar música;
            importDinamico();
        }
    }, [musicaContext]);

    // Avançar;
    async function handleAvancar() {
        // console.log(listaMusicasContext);

        // Se o isModoLoopContext for true, volte para o início da mesma música;
        // console.log(`player.js: ${isModoLoopContext}`);
        if (isModoLoopContext) {
            await infoMusicaContext?.sound?.setPositionAsync(0);
            await infoMusicaContext?.sound?.playAsync();
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
        }
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

        // Se a música acabar, vai pra próxima;
        // console.log(infoMusicaContext?.status);
        if (infoMusicaContext?.status?.didJustFinish) {
            handleAvancar();
        }
    }, [infoMusicaContext?.status]);

    // Play/pausar música ao clicar no ícone;
    async function handleIsPlaying() {
        if (infoMusicaContext?.status?.isPlaying) {
            await infoMusicaContext?.sound?.pauseAsync();
        } else {
            await infoMusicaContext?.sound?.playAsync();
        }
    }

    return (
        musicaContext?.musicaId > 0 && usuarioContext?.usuarioId > 0 ? (
            <View style={Styles.container}>
                <LinearGradient
                    colors={(coresDominantes ? [coresDominantes.corRgba, coresDominantes.corMedia, coresDominantes.corClara] : ['#287a45', '#23944b', '#1db954', '#18d65b'])}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 5 }}
                >
                    <View style={Styles.player}
                        onLayout={(event) => {
                            var { x, y, width, height } = event.nativeEvent.layout;
                            // console.log(width);
                            setWidthContainerPlayer(width);
                        }}>

                        <TouchableOpacity style={Styles.esquerda} onPress={() => navigation.navigate('PlayerFullScreen')}>
                            {
                                imagemBanda ? (
                                    <Image source={{ uri: imagemBanda }} style={Styles.imageBackground}></Image>
                                ) : (
                                    <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                                )
                            }

                            <View style={Styles.divInfoMusica}>
                                <TextTicker duration={8000} loop bounce={false} repeatSpacer={50} marqueeDelay={0} style={Styles.tituloMusica}>
                                    {musicaContext.nome}
                                </TextTicker>

                                <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>{musicaContext.musicasBandas[0]?.bandas.nome}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={Styles.direita}>
                            <TouchableOpacity
                                onPress={() => Aviso('success', 'Opa 😞', 'Essa função ainda não foi desenvolvida', 5000)}
                                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            >
                                <Dispositivo height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                            </TouchableOpacity>

                            <View style={Styles.margemDireita}></View>

                            {/* Botão play/stop */}
                            <TouchableOpacity onPress={() => handleIsPlaying()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                                {
                                    infoMusicaContext?.status?.isPlaying ? (
                                        <BotaoStop height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                                    ) : (
                                        <BotaoPlay height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                                    )
                                }
                            </TouchableOpacity>

                            <View style={Styles.margemDireita}></View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Progress bar */}
                <View style={Styles.margemTopPequena}>
                    <Progress.Bar progress={porcetagemMusicaOuvida} animationType={'spring'} animated={true}
                        height={2} width={widthContainerPlayer} color={'rgba(255, 255, 255, 0.8)'} borderWidth={0} borderRadius={10}
                        unfilledColor={(coresDominantes ? coresDominantes.corClara : '#404131')}
                    />
                </View>
            </View>
        ) : (
            <View>
                {/* Nenhuma música foi selecionada ainda */}
            </View>
        )
    );
}

