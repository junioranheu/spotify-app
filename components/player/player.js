import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/player';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { MusicaContext } from '../../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import BotaoPlay from '../svg/botaoPlay';
import Dispositivo from '../svg/dispositivo';

export default function Player() {
    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [imagemBanda, setImagemBanda] = useState(null);

    useEffect(() => {
        console.log(musicaContext);

        // Import dinâmico: capa da música reproduzindo;
        if (musicaContext?.musicaId > 0) {
            if (musicaContext?.musicasBandas[0]?.bandas.foto) {
                const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${musicaContext?.musicasBandas[0]?.bandas.foto}`;
                setImagemBanda(img);
            }
        }
    }, [musicaContext]);

    return (
        musicaContext?.musicaId > 0 ? (
            <View style={Styles.container}>
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
            </View>
        ) : (
            <View>
                {/* Nenhuma música foi selecionada ainda */}
            </View>
        )
    );
}

