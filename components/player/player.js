import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/player';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext } from '../../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import BotaoPlay from '../svg/botaoPlay';
import Dispositivo from '../svg/dispositivo';

export default function Player() {
    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [imagemBanda, setImagemBanda] = useState(null);
    const [arquivoMusica, setArquivoMusica] = useState();

    // Ao alterar a música em musicaContext;
    useEffect(() => {
        // console.log(musicaContext);

        async function importDinamico() {
            // Importar música dinamicamente;
            const url = `${CONSTANTS_UPLOAD.API_URL_GET_MUSIC}/${musicaContext.musicaId}.mp3`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'audio/mpeg',
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    // Criar blob;
                    const arquivoBlob = window.URL.createObjectURL(
                        new Blob([blob], {
                            type: 'audio/mpeg'
                        }),
                    );

                    // console.log(arquivoBlob);
                    setArquivoMusica(arquivoBlob);
                    console.log(`Música "${musicaContext.nome}" (${musicaContext.musicaId}) importada`);

                    // Quando a música for importada, é necessário removê-la da lista/fila;
                    const indexMusicaTocando = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                    listaMusicasContext?.splice(indexMusicaTocando, 1);
                    ListaMusicasStorage.set(listaMusicasContext);
                    setListaMusicasContext(listaMusicasContext);
                });
        }

        // Import dinâmico: capa da música reproduzindo;
        if (musicaContext?.musicaId > 0) {
            // Atribuir a imagem da música atual;
            if (musicaContext?.musicasBandas[0]?.bandas.foto) {
                const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${musicaContext?.musicasBandas[0]?.bandas.foto}`;
                setImagemBanda(img);
            }

            importDinamico();
        }
    }, [musicaContext]);

    return (
        musicaContext?.musicaId > 0 ? (
            <View style={Styles.container}>
                <LinearGradient colors={['#287a45', '#23944b', '#1db954', '#18d65b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 5 }}>
                    <View style={Styles.player}>
                        <View style={Styles.esquerda}>
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
                        </View>

                        <View style={Styles.direita}>
                            <Dispositivo height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                            <View style={Styles.margemDireita}></View>
                            <BotaoPlay height={20} width={20} cor='rgba(255, 255, 255, 0.85)' />
                            <View style={Styles.margemDireita}></View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        ) : (
            <View>
                {/* Nenhuma música foi selecionada ainda */}
            </View>
        )
    );
}

