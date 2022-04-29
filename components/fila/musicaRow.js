import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/fila';
import ImgCinza from '../../static/image/outros/cinza.webp';
import EqualiserGif from '../../static/image/outros/equaliser.gif';
import { InfoMusicaContext } from '../../utils/context/infoMusicaContext';
import { MusicaContext } from '../../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import Aviso from '../../utils/outros/aviso';
import Reticencias from '../svg/reticencias';

export default function MusicaRow({ id, foto, titulo, banda, album, tempo, setarMusica }) {
    const [infoMusicaContext] = useContext(InfoMusicaContext); // Context da música que está tocando, contendo suas informações;

    // Quando uma música é selecionada no MusicaContext;
    const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [imagemBanda, setImagemBanda] = useState(null);

    const [isExibirEqualiser, setIsExibirEqualiser] = useState(false);
    useEffect(() => {
        // console.log(musicaContext);
        // console.log(musicaContext?.musicaId);

        // Import dinâmico: capa da música reproduzindo;
        if (foto) {
            // console.log('Entrou aqui com o nome de ' + foto);
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
            setImagemBanda(img);
        }

        // Mostrar o equaliser;
        setIsExibirEqualiser(false);
        const timeOut = window.setTimeout(() => {
            setIsExibirEqualiser(true);
        }, 1000);

        return () => window.clearTimeout(timeOut);
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
                            isExibirEqualiser && infoMusicaContext?.status?.isPlaying && id === musicaContext?.musicaId && (
                                <Image source={EqualiserGif} style={Styles.equaliser}></Image>
                            )
                        }

                        <Text numberOfLines={1} ellipsizeMode='tail' style={[Styles.tituloMusica, (id === musicaContext?.musicaId ? Styles.corVerde : null)]}>
                            {titulo}
                        </Text>
                    </View>

                    <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.banda}>{banda}</Text>
                </View>

                <View style={Styles.direita}>
                    <TouchableOpacity
                        onPress={() => Aviso('success', 'Opa 😞', 'Essa função ainda não foi desenvolvida', 5000)}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                        <Reticencias height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

