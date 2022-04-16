import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Navbar from '../components/outros/navbar';
import Playlists from '../components/playlists/playlists';
import Styles from '../css/app';
import StylesPlaylist from '../css/playlists';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function App() {

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
        <SafeAreaView style={Styles.safeAreaView} barStyle='default'>
            <Navbar />

            <View style={Styles.container}>
                <Text style={Styles.bomDia}>{gerarOla()}</Text>

                <View style={Styles.div}>
                    <Text style={Styles.titulo}>Playlists disponíveis no momento {EmojiAleatorio()}</Text>

                    {playlists && (
                        <View style={StylesPlaylist.divPlaylists}>
                            <ScrollView horizontal={true} >
                                {playlists.filter(x => x.isAtivo === 1).map((p) => (
                                    <Playlists playlist={p} key={p.playlistId} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                <Text style={Styles.titulo}>Chaleco CTM {EmojiAleatorio()}</Text>
            </View>
        </SafeAreaView>
    );
}

