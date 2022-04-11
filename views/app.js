import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Navbar from '../components/outros/navbar';
import Playlists from '../components/playlists/playlists';
import Styles from '../css/app';
import StylesPlaylist from '../css/playlists';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function App() {

    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        async function getPlaylists() {
            const res = await fetch('https://spotifyapi.azurewebsites.net/api/Playlists/todos')
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
        <Fragment>
            <Navbar />

            <View style={[Styles.container, { backgroundColor: 'white' }]}>
                <Text style={Styles.bomDia}>{gerarOla()}</Text>

                <View style={Styles.div}>
                    <Text style={Styles.titulo}>Playlists disponíveis no momento {EmojiAleatorio()}</Text>

                    {playlists && (
                        <View style={StylesPlaylist.divPlaylists}>
                            {playlists.filter(x => x.isAtivo === 1).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} />
                            ))}
                        </View>
                    )}
                </View>

                <StatusBar style='auto' />
            </View>
        </Fragment >
    );
}

