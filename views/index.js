import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AlbunsPequenos from '../components/outros/albunsPequenos';
import Botao from '../components/outros/botao';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Playlists from '../components/playlists/playlists';
import Engrenagem from '../components/svg/engrenagem';
import Historico from '../components/svg/historico';
import Notificacao from '../components/svg/notificacao';
import Styles from '../css/index';
import StylesPlaylist from '../css/playlists';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Index({ navigation }) {

    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        async function getPlaylists() {
            const res = await fetch(CONSTANTS_PLAYLISTS.API_URL_GET_TODOS)
            const playlists = await res.json();
            // console.log(playlists);
            setPlaylists(playlists);
        }

        getPlaylists();
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

    return (
        <ScrollView style={Styles.container}>
            {/* Olá + Ícones */}
            <View style={Styles.divOla}>
                <Text style={Styles.titulo}>{gerarOla()}</Text>

                <View style={Styles.direita}>
                    <Notificacao height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.espacoIcones}></View>
                    <Historico height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                    <View style={Styles.espacoIcones}></View>
                    <Engrenagem height={24} width={24} cor='rgba(255, 255, 255, 0.85)' />
                </View>
            </View>

            {/* Div com albuns pequenos*/}
            <AlbunsPequenos />

            {/* Playlists */}
            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Playlists disponíveis {EmojiAleatorio()}</Text>

                {playlists && (
                    <View style={StylesPlaylist.divPlaylists}>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {playlists.filter(x => x.isAtivo === 1 && !x.nome.includes('Funk')).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Playlists */}
            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Playlists 100% brasileiras</Text>

                {playlists && (
                    <View style={StylesPlaylist.divPlaylists}>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {playlists.filter(x => x.isAtivo === 1 && x.nome.includes('Funk')).map((p) => (
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
                    <Botao texto='Importar todas as músicas' corTexto='rgba(255, 255, 255, 0.8)' corBotao='rgba(29, 185, 84, 0.8)' height={50} width={'100%'} url='Fila' isExterno={false} />
                </View>
            </View>

            {/* Margem do footer */}
            <MargemBotFooter />
        </ScrollView>
    );
}

