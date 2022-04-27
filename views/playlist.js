import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import MargemBotFooter from '../components/outros/margemBotFooter';
import SetinhaBaixo2 from '../components/svg/setinhaBaixo2';
import StylesFila from '../css/fila';
import StylesGlobal from '../css/global';
import Styles from '../css/playlist';
import ImgCinza from '../static/image/outros/cinza.webp';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';

export default function Playlist({ route, navigation }) {
    const { playlistId } = route.params;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [musicasPlaylist, setMusicasPlaylist] = useState(null);
    const [imagemCapa, setImagemCapa] = useState(null);
    useEffect(() => {
        async function getPlaylist() {
            const url = `${CONSTANTS_MUSICAS.API_URL_POR_PLAYLIST}/${playlistId}`;
            const res = await fetch(url);
            const musicas = await res.json();

            // Tive que chamar duas vezes o mesmo end-point para corrigir um bug bizarro;
            // Se usasse a mesma variável aqui em "musicasPlaylist", quando o "listaMusicasContext" fosse alterado, a variável também era alterada;
            const urlTemp = `${CONSTANTS_MUSICAS.API_URL_POR_PLAYLIST}/${playlistId}`;
            const resTemp = await fetch(urlTemp);
            const musicasTemp = await resTemp.json();
            setMusicasPlaylist(musicasTemp);

            // Salvar no Context e no localStorage (fila) a playlist atual;
            ListaMusicasStorage.set(musicas);
            setListaMusicasContext(musicas);

            // Imagem de capa;
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlistId}.webp`;
            console.log(img);
            setImagemCapa(img);
        }

        getPlaylist();
    }, []);

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
        const res = await fetch(url);
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);

        // Bloquear "avanço";
        setIsPodeAvancar(false);
    }

    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    useEffect(() => {
        // Aguardar x segundos para poder avançar novamente, para evitar bugs;
        const timeOut = window.setTimeout(() => {
            setIsPodeAvancar(true);
        }, 1000);

        return () => window.clearTimeout(timeOut);
    }, [isPodeAvancar]);

    return (
        <ScrollView style={StylesGlobal.containerPrincipal} stickyHeaderIndices={[0]}>
            {/* Parte superior: ícone de voltar */}
            <View style={Styles.margemLeftPequena}>
                <TouchableOpacity
                    style={[Styles.flexEsquerda, Styles.margemEsquerdaPequena]}
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                >
                    <SetinhaBaixo2 height={20} width={20} cor='rgba(255, 255, 255, 0.6)' />
                </TouchableOpacity>
            </View>

            {/* Imagem de capa */}
            <View style={Styles.centralizar}>
                {
                    imagemCapa ? (
                        <Image source={{ uri: imagemCapa }} style={Styles.imageBackground}></Image>
                    ) : (
                        <Image source={ImgCinza} style={Styles.imageBackground}></Image>
                    )
                }
            </View>

            {/*  Lista de músicas da playlist */}
            <View style={StylesFila.margemTop}>
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
                            {/* <Text style={StylesFila.subtitulo}>Sem músicas nessa playlist</Text> */}
                        </View>
                    )
                }
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

