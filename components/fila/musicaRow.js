import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/fila';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { MusicaContext } from '../../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';

export default function MusicaRow({ i, id, foto, titulo, banda, album, tempo, setarMusica, isDesativarUm }) {

    // Quando uma música é selecionada no MusicaContext;
    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [imagemBanda, setImagemBanda] = useState(null);
    useEffect(() => {
        // console.log(musicaContext);
        // console.log(musicaContext?.musicaId);

        // Import dinâmico: capa da música reproduzindo;
        if (foto) {
            // console.log('Entrou aqui com o nome de ' + foto);
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
            setImagemBanda(img);
        }
    }, [musicaContext]);

    return (
        <View style={Styles.divMusica}>
            {
                imagemBanda ? (
                    <Image source={{ uri: imagemBanda }} style={Styles.imageBackground}></Image>
                ) : (
                    <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                )
            }

            <View style={Styles.divInfoMusica}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.tituloMusica}>{titulo}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>{banda}</Text>
            </View>
        </View>
    );
}

