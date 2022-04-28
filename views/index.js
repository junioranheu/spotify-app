import React, { useContext, useEffect } from 'react';
import { Platform, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import AlbunsPequenos from '../components/outros/albunsPequenos';
import Botao from '../components/outros/botao';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Playlists from '../components/playlists/playlists';
import Engrenagem from '../components/svg/engrenagem';
import Historico from '../components/svg/historico';
import Notificacao from '../components/svg/notificacao';
import StylesGlobal from '../css/global';
import Styles from '../css/index';
import StylesPlaylist from '../css/playlists';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { PlaylistsContext } from '../utils/context/playlistsContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import Aviso from '../utils/outros/aviso';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';
import { UsuarioContext } from '../utils/context/usuarioContext';

export default function Index({ navigation }) {
    const [usuarioContext] = useContext(UsuarioContext); // Contexto do usuário;
    const [playlistsContext, setPlaylistsContext] = useContext(PlaylistsContext); // Context das playlists disponiveis;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;

    // Caso o playlistsContext esteja vazio (web), force o fetch;
    useEffect(() => {
        async function getPlaylists() {
            const res = await fetch(CONSTANTS_PLAYLISTS.API_URL_GET_TODOS);
            const playlists = await res.json();
            setPlaylistsContext(playlists);
        }

        if (Platform.OS === 'web') {
            getPlaylists();
        }
    }, []);

    function gerarOla() {
        var hora = HorarioBrasilia().hour();
        // console.log(hora);
        var msg = '';

        if (hora >= 5 && hora < 12) {
            msg = 'Bom dia';
        } else if (hora >= 12 && hora < 18) {
            msg = 'Boa tarde';
        } else {
            msg = 'Boa noite';
        }

        return msg;
    }

    async function renovarFila() {
        const url = CONSTANTS_MUSICAS.API_URL_GET_TODOS;
        const res = await fetch(url)
        const musicas = await res.json();

        // Salvar no Context e no localStorage;
        // console.log(musicas);
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);

        // Aviso.custom('Todas as músicas disponíveis atualmente foram importadas para sua fila', 10000);
        Aviso('success', 'Feito 😎', 'Todas as músicas importadas para sua fila', 5000);
    }

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            {/* Olá + Ícones */}
            <View style={Styles.divOla}>
                <Text style={Styles.titulo}>
                    {gerarOla()}

                    {
                        (usuarioContext?.usuarioId > 0) && (usuarioContext?.nomeCompleto?.split(' ')[0].length < 11) && (
                            <Text>, {usuarioContext?.nomeCompleto?.split(' ')[0]}</Text>
                        )
                    }

                </Text>
                {
                    usuarioContext?.usuarioId > 0 && (
                        <View style={Styles.direita}>
                            <Notificacao height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                            <View style={Styles.espacoIcones}></View>
                            <Historico height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                            <View style={Styles.espacoIcones}></View>

                            <TouchableOpacity onPress={() => navigation.navigate('Configuracao')} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                                <Engrenagem height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>

            {/* Div com albuns pequenos*/}
            <AlbunsPequenos />

            {/* Playlists */}
            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Playlists disponíveis {EmojiAleatorio()}</Text>

                {playlistsContext.length > 0 && (
                    <View style={StylesPlaylist.divPlaylists}>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {playlistsContext.filter(x => x.isAtivo === 1 && !x.nome.includes('Funk')).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Playlists */}
            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Playlists 100% brasileiras</Text>

                {playlistsContext.length > 0 && (
                    <View style={StylesPlaylist.divPlaylists}>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {playlistsContext.filter(x => x.isAtivo === 1 && x.nome.includes('Funk')).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Botão para importar todas as músicas */}
            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Outras playlists</Text>
                <Text style={Styles.texto}>Novas playlists serão criadas e, mais para frente, será permitido criar suas proprias!</Text>
                <Text style={Styles.texto}>Para “renovar” sua playlist por completo, clique no botão abaixo.</Text>

                <View style={Styles.margemTopPequena}>
                    <Botao
                        texto='Importar todas as músicas'
                        corTexto='rgba(255, 255, 255, 0.8)'
                        corBotao='rgba(29, 185, 84, 0.8)'
                        corBotaoOnPress='rgba(29, 185, 84, 0.4)'
                        height={50}
                        width={'100%'}
                        url=''
                        isExterno={false}
                        funcaoExtra={renovarFila}
                        refBtn={null}
                    />
                </View>
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

