import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import MargemBotFooter from '../components/outros/margemBotFooter';
import StylesFila from '../css/fila';
import StylesGlobal from '../css/global';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';

export default function Playlist({ route, navigation }) {
    const { playlistId } = route.params;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [musicasPlaylist, setMusicasPlaylist] = useState(null);
    async function getPlaylist(playlistId) {
        const url = `${CONSTANTS_MUSICAS.API_URL_POR_PLAYLIST}/${playlistId}`;

        const res = await fetch(url);
        const musicas = await res.json();
        setMusicasPlaylist(musicas);

        // Salvar no Context e no localStorage (fila) a playlist atual;
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);
    }

    useEffect(() => {
        getPlaylist(playlistId);
    }, []);

    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    async function setarMusica(id) {
        if (!isPodeAvancar) {
            console.log('Não é possível avançar a música agora, aguarde um momento');
            return false;
        }

        // console.log(id);

        // Se o usuário estiver deslogado;
        // if (!isAuth) {
        //     Aviso.custom('Inicie uma sessão para escutar essa música', 5000);
        //     return false;
        // }

        const url = `${CONSTANTS_MUSICAS.API_URL_GET_POR_ID}/${id}`;
        const res = await fetch(url)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);

        // Bloquear "avanço";
        setIsPodeAvancar(false);

        // Salvar playlist novamente;
        getPlaylist(playlistId);
    }

    useEffect(() => {
        // Aguardar x segundos para poder avançar novamente, para evitar bugs;
        const timeOut = window.setTimeout(() => {
            setIsPodeAvancar(true);
        }, 1000);

        return () => window.clearTimeout(timeOut);
    }, [isPodeAvancar]);

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            {/* Próximas músicas na fila */}
            <View style={StylesFila.margemTop}>
                <Text style={StylesFila.titulo}>Playlist {playlistId}</Text>

                <View style={StylesFila.margemTopPequena}>
                    {
                        musicasPlaylist?.length > 0 ? (
                            <Fragment>
                                {
                                    musicasPlaylist.map((m, i) => (
                                        <MusicaRow
                                            key={m.musicaId}
                                            id={m.musicaId}
                                            foto={m.musicasBandas[0]?.bandas.foto}
                                            titulo={m.nome}
                                            banda={m.musicasBandas[0]?.bandas.nome}
                                            album={m.albunsMusicas[0]?.albuns.nome}
                                            tempo={m.duracaoSegundos}
                                            setarMusica={setarMusica}
                                        />
                                    ))
                                }
                            </Fragment>
                        ) : (
                            <View>
                                {/* <Text style={StylesFila.subtitulo}>Sem músicas na sua fila de reprodução</Text> */}
                            </View>
                        )
                    }
                </View>
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

