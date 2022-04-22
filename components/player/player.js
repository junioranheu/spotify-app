import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // https://docs.expo.dev/versions/latest/sdk/audio/
import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import FastAverageColor from 'fast-average-color'; // https://github.com/fast-average-color/fast-average-color
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress'; // https://www.npmjs.com/package/react-native-progress
import Styles from '../../css/player';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext } from '../../utils/context/musicaContext';
import CONSTANTS_IMAGENS from '../../utils/data/constImagens';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import BotaoPlay from '../svg/botaoPlay';
import BotaoStop from '../svg/botaoStop';
import Dispositivo from '../svg/dispositivo';

export default function Player() {
    const navigation = useNavigation();

    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [widthContainerPlayer, setWidthContainerPlayer] = useState();
    const [imagemBanda, setImagemBanda] = useState(null);
    const [musica, setMusica] = useState();
    const [infosMusica, setInfosMusica] = useState();

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
                (status) => setInfosMusica(status)
            );
            await sound.playAsync();
            setMusica(sound);

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

                // Pegar a cor predominante da imagem;
                const urlImagemBase64 = `${CONSTANTS_IMAGENS.API_URL_GET_POR_CAMINHO_ID}?caminho=capas/${musicaContext?.musicasBandas[0]?.bandas.bandaId}.webp`;
                console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: ' + urlImagemBase64);
                const res = await fetch(urlImagemBase64)
                const imgBase64 = await res.json();

                const fac = new FastAverageColor();
                fac.getColorAsync(imgBase64)
                    .then(color => {
                        console.log(color.rgba);
                        // container.style.backgroundColor = color.rgba;
                        // container.style.color = color.isDark ? '#fff' : '#000';
                    })
                    .catch(e => {
                        console.log(e);
                    });
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
        // console.log(infosMusica); // Todos os status;
        // console.log(infosMusica?.durationMillis); // Total ms;
        // console.log(infosMusica?.positionMillis); // Atual ms;

        // Calcular a porcentagem da música escutada para setar no progressbar;
        let porcentagemMusicaOuvidaCalculo = (infosMusica?.positionMillis / infosMusica?.durationMillis); // * 100
        porcentagemMusicaOuvidaCalculo = !porcentagemMusicaOuvidaCalculo ? 0 : Number(porcentagemMusicaOuvidaCalculo.toFixed(2));
        setPorcetagemMusicaOuvida(porcentagemMusicaOuvidaCalculo);
        // console.log(porcentagemMusicaOuvidaCalculo);
    }, [infosMusica]);

    // Descarregar som ao trocar de música;
    useEffect(() => {
        return musica
            ? () => {
                // console.log('Descarregando som');
                musica.unloadAsync();
            }
            : undefined;
    }, [musica]);

    // Play/pausar música ao clicar no ícone;
    async function handleIsPlaying() {
        if (infosMusica?.isPlaying) {
            await musica.pauseAsync();
        } else {
            await musica.playAsync();
        }
    }

    return (
        musicaContext?.musicaId > 0 ? (
            <View style={Styles.container}>
                <LinearGradient
                    colors={['#287a45', '#23944b', '#1db954', '#18d65b']}
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
                            {
                                infosMusica?.isPlaying ? (
                                    <TouchableOpacity onPress={() => handleIsPlaying()}>
                                        <BotaoStop height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleIsPlaying()}>
                                        <BotaoPlay height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                                    </TouchableOpacity>
                                )
                            }

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

