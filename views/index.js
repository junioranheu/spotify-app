import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Playlists from '../components/playlists/playlists';
import Styles from '../css/app';
import StylesPlaylist from '../css/playlists';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function App({ navigation }) {

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
        <SafeAreaView style={Styles.safeAreaView}>
            <View style={Styles.container}>
                <Text style={Styles.titulo}>{gerarOla()}</Text>

                <View style={Styles.div}>
                    <Text style={Styles.titulo} onPress={() => navigation.navigate('Fila')}>Playlists disponíveis no momento {EmojiAleatorio()}</Text>

                    {playlists && (
                        <View style={StylesPlaylist.divPlaylists}>
                            <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                {playlists.filter(x => x.isAtivo === 1).map((p) => (
                                    <Playlists playlist={p} key={p.playlistId} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

