import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/fila';
import ImgCinza from '../../static/image/outros/cinza.webp';
import EqualiserGif from '../../static/image/outros/equaliser.gif';
import { MusicaContext } from '../../utils/context/musicaContext';
import { MusicaPlayingContext } from '../../utils/context/musicaPlayingContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import Reticencias from '../svg/reticencias';

export default function MusicaRow({ id, foto, titulo, banda, album, tempo, setarMusica }) {
    const [musicaPlayingContext] = useContext(MusicaPlayingContext); // Context da música que está tocando, contendo suas informações;

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
        <TouchableOpacity onPress={() => (setarMusica ? setarMusica(id) : false)}>
            <View style={Styles.divMusica}>
                {
                    imagemBanda ? (
                        <Image source={{ uri: imagemBanda }} style={Styles.imageBackground}></Image>
                    ) : (
                        <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                    )
                }

                <View style={Styles.divInfoMusica}>
                    <View style={Styles.mesmaLinha}>
                        {
                            musicaPlayingContext?.status?.isPlaying && (
                                <Fragment>
                                    {id === musicaContext?.musicaId && (
                                        <Image source={EqualiserGif} style={Styles.equaliser}></Image>
                                    )}
                                </Fragment>
                            )
                        }

                        <Text numberOfLines={1} ellipsizeMode='tail' style={[Styles.tituloMusica, (id === musicaContext?.musicaId ? Styles.corVerde : null)]}>
                            {titulo}
                        </Text>
                    </View>

                    <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>{banda}</Text>
                </View>

                <View style={Styles.direita}>
                    <Reticencias height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                </View>
            </View>
        </TouchableOpacity>
    );
}

