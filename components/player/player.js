import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // https://docs.expo.dev/versions/latest/sdk/audio/
import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress'; // https://www.npmjs.com/package/react-native-progress
import Styles from '../../css/player';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext } from '../../utils/context/musicaContext';
import { MusicaPlayingContext } from '../../utils/context/musicaPlayingContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import BotaoPlay from '../svg/botaoPlay';
import BotaoStop from '../svg/botaoStop';
import Dispositivo from '../svg/dispositivo';

export default function Player() {
    const navigation = useNavigation();

    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaPlayingContext, setMusicaPlayingContext] = useContext(MusicaPlayingContext); // Context da música que está tocando, contendo suas informações;

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

            // "Criar" música;
            const { sound } = await Audio.Sound.createAsync(
                { uri: urlMusica },
                { shouldPlay: true, isLooping: false, playsInSilentModeIOS: true },
                (status) => {
                    // Setar em "setMusicaPlayingContext" o status (informações da música atual) + sound (a música em si);
                    const jsonFinal = {
                        status: status,
                        sound: sound
                    }

                    // Setar valores (status) em uma variável context para ser usada aqui e em outras telas;
                    setMusicaPlayingContext(jsonFinal);
                }
            );
            await sound.playAsync();

            // Log;
            console.log(`Música "${musicaContext.nome}" (${musicaContext.musicaId}) importada`);

            // Quando a música for importada, é necessário removê-la da lista/fila;
            const indexMusicaTocando = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
            listaMusicasContext?.splice(indexMusicaTocando, 1);
            ListaMusicasStorage.set(listaMusicasContext);
            setListaMusicasContext(listaMusicasContext);
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

        // Import dinâmico: capa da música reproduzindo;
        if (musicaContext?.musicaId > 0) {
            // Atribuir a imagem da música atual;
            if (musicaContext?.musicasBandas[0]?.bandas.foto) {
                getImagemCapaMusica();
            }

            // Importar música;
            importDinamico();
        }
    }, [musicaContext]);

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

    // Descarregar som ao trocar de música;
    useEffect(() => {
        return musicaPlayingContext.sound
            ? () => {
                // console.log('Descarregando som');
                musicaPlayingContext.sound.unloadAsync();
            }
            : undefined;
    }, [musicaPlayingContext?.sound]);

    // Play/pausar música ao clicar no ícone;
    async function handleIsPlaying() {
        if (musicaPlayingContext?.status?.isPlaying) {
            await musicaPlayingContext.sound.pauseAsync();
        } else {
            await musicaPlayingContext.sound.playAsync();
        }
    }

    return (
        musicaContext?.musicaId > 0 ? (
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
                                <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.tituloMusica}>{musicaContext.nome}</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>{musicaContext.musicasBandas[0]?.bandas.nome}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={Styles.direita}>
                            <Dispositivo height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                            <View style={Styles.margemDireita}></View>

                            {/* Botão play/stop */}
                            <TouchableOpacity onPress={() => handleIsPlaying()}>
                                {
                                    musicaPlayingContext?.status?.isPlaying ? (
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
                    <Progress.Bar progress={porcetagemMusicaOuvida} animationType={'timing'}
                        height={2} width={widthContainerPlayer} color={'rgba(255, 255, 255, 0.8)'} borderWidth={0} borderRadius={10}
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

