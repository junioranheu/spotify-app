import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Playlists from '../components/playlists/playlists';
import Engrenagem from '../components/svg/engrenagem';
import Historico from '../components/svg/historico';
import Notificacao from '../components/svg/notificacao';
import Styles from '../css';
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
        <View style={Styles.container}>
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

            <View style={Styles.margemTop}>
                <Text style={Styles.titulo}>Playlists disponíveis {EmojiAleatorio()}</Text>

                {playlists && (
                    <View style={StylesPlaylist.divPlaylists}>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {playlists.filter(x => x.isAtivo === 1).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </View>
    );
}

