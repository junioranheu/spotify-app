import { LinearGradient } from 'expo-linear-gradient'; // https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Coracao from '../components/svg/coracao';
import CoracaoPreenchido from '../components/svg/coracaoPreenchido';
import Reticencias from '../components/svg/reticencias';
import SetinhaBaixo2 from '../components/svg/setinhaBaixo2';
import Styles from '../css/playlist';
import ImgCinza from '../static/image/outros/cinza.webp';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';
import CONSTANTS_UPLOAD from '../utils/data/constUpload';
import formatarSegundosComLegenda from '../utils/outros/formatarSegundosComLegenda';

export default function Playlist({ route, navigation }) {
    const { playlist } = route.params;

    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [musicasPlaylist, setMusicasPlaylist] = useState(null);
    const [imagemCapa, setImagemCapa] = useState(null);
    const [coresDominantes, setCoresDominantes] = useState(null);
    const [duracaoPlaylist, setDuracaoPlaylist] = useState('');
    const [ouvintesPlaylist, setOuvintesPlaylist] = useState(0);
    const [isExibirConteudo, setIsExibirConteudo] = useState(false);
    useEffect(() => {
        async function getPlaylist() {
            // Músicas da playlist;
            const url = `${CONSTANTS_MUSICAS.API_URL_POR_PLAYLIST}/${playlist?.playlistId}`;
            const res = await fetch(url);
            const musicas = await res.json();

            // Salvar no Context e no localStorage (fila) a playlist atual;
            ListaMusicasStorage.set(musicas);
            setListaMusicasContext(musicas);

            // Copiar a variável "musicas" usando [...musicas];
            // Se usasse, por algum motivo misterioso, a mesma variável aqui em "musicasPlaylist"...
            // quando o "listaMusicasContext" fosse alterado, a variável também era alterada;
            const musicasTemp = [...musicas];
            setMusicasPlaylist(musicasTemp);

            // Imagem de capa;
            const img = `${CONSTANTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlist?.playlistId}.webp`;
            setImagemCapa(img);

            // Pegar a cor dominante;
            if (playlist?.corDominante) {
                const corRgba = playlist?.corDominante;

                var tudoAntesUltimaVirgula = corRgba.substr(0, corRgba.lastIndexOf(','));
                const corMedia = `${tudoAntesUltimaVirgula}, 0.4)`;
                const corClara = `${tudoAntesUltimaVirgula}, 0.1)`;

                // console.log({corRgba, corMedia, corClara})
                setCoresDominantes({ corRgba, corMedia, corClara });
            }

            // Setar o tempo e ouvintes total da playlist;
            if (playlist?.playlistsMusicas) {
                const d = somarDuracaoTotal(playlist?.playlistsMusicas);
                setDuracaoPlaylist(d);

                const o = somarOuvintesTotal(playlist?.playlistsMusicas);
                setOuvintesPlaylist(o);
            }

            // Exibir conteúdo depois que tudo estiver carregado;
            setIsExibirConteudo(true);
        }

        getPlaylist();
    }, [playlist]);

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

    // Somar a duração das músicas na playlist em questão;
    function somarDuracaoTotal(lista) {
        let duracao = 0;
        lista.forEach(function (playlist, index) {
            // console.log(playlist);
            const d = playlist.musicas.duracaoSegundos;
            duracao += d;
        });

        return duracao;
    }

    // Somar a quantidade de ouvintes das músicas na playlist em questão;
    function somarOuvintesTotal(lista) {
        let ouvintes = 0;
        lista.forEach(function (playlist, index) {
            // console.log(playlist);
            const o = playlist.musicas.ouvintes;
            ouvintes += o;
        });

        return ouvintes;
    }

    // Curtir;
    const [isCurtido, setIsCurtido] = useState(false);
    function handleCurtir() {
        setIsCurtido(!isCurtido);
    }

    // onScroll;
    function handleScroll(e) {
        const positionY = e.nativeEvent.contentOffset.y;
        // console.log(positionY);
    }

    // Tela carregando;
    if (!isExibirConteudo) {
        return (
            <View style={Styles.containerPrincipal}></View>
        );
    }

    return (
        <View style={Styles.containerPrincipal}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => handleScroll(e)}
                scrollEventThrottle={1}
            >
                <LinearGradient
                    colors={(coresDominantes ? [coresDominantes.corRgba, '#121212', '#121212', '#121212', '#121212', '#121212'] : ['#121212', '#121212'])}
                    style={{ flex: 1, padding: 15 }}
                >
                    {/* Parte superior: ícone de voltar + imagem da playlist */}
                    <View style={[Styles.mesmaLinha, Styles.margemTopPequena]}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                        >
                            <SetinhaBaixo2 height={20} width={20} cor='rgba(255, 255, 255, 0.6)' isRotate={true} />
                        </TouchableOpacity>

                        {/* Imagem de capa */}
                        <View style={Styles.centralizar}>
                            {
                                imagemCapa ? (
                                    <ImageBackground source={{ uri: imagemCapa }} style={Styles.imageBackground}></ImageBackground>
                                ) : (
                                    <ImageBackground source={ImgCinza} style={Styles.imageBackground}></ImageBackground>
                                )
                            }
                        </View>

                        {/* Terceira div, para ocupar espaço e centralizar corretamente */}
                        <View style={Styles.esconderOcupandoEspaco}>
                            <SetinhaBaixo2 height={20} width={20} cor='#121212' isRotate={true} />
                        </View>
                    </View>

                    {/* Informações da playlist */}
                    <View style={Styles.margemTopPequena}>
                        <Text style={Styles.texto}>{playlist?.sobre}</Text>
                        <Text style={[Styles.textoBranco, Styles.margemTopSuperPequena]}>{playlist?.usuarios?.nomeCompleto}</Text>
                        <Text style={[Styles.texto, Styles.margemTopSuperPequena]}>
                            {ouvintesPlaylist} {(ouvintesPlaylist === 1) ? 'ouvinte' : 'ouvintes'}
                            &nbsp;•&nbsp;
                            {formatarSegundosComLegenda(duracaoPlaylist)}
                        </Text>
                    </View>

                    {/* Ícones */}
                    <View style={[Styles.mesmaLinha, Styles.margemTopPequena]}>
                        <TouchableOpacity onPress={() => handleCurtir()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            {
                                isCurtido ? (
                                    <CoracaoPreenchido height={20} width={20} cor={'#20D660'} />
                                ) : (
                                    <Coracao height={20} width={20} cor={'rgba(255, 255, 255, 0.9)'} />
                                )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.margemEsquerda} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            <Reticencias height={18} width={18} cor='rgba(255, 255, 255, 0.6)' />
                        </TouchableOpacity>
                    </View>

                    {/* Lista de músicas da playlist */}
                    <View style={Styles.margemTop}>
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
                </LinearGradient>
            </ScrollView>
        </View >
    );
}

