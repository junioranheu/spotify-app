import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/playlists';
import BotaoPlay from '../svg/botaoPlay';

export default function Playlists({ playlist }) {

    // Import dinâmico: thumbnail da playlist;
    let Thumbnail = '';
    try {
        Thumbnail = require(`../../static/playlists/${playlist.foto}`);
        // console.log(Thumbnail);
    } catch (err) {
        Thumbnail = require('../../static/image/cinza.webp');
        // console.log(err);
    }

    return (
        // <Link href={`/playlist/${playlist.playlistId}`} passHref>
        <View style={Styles.playlist} id={playlist.playlistId}>
            <View style={Styles.divThumbnail}>

            </View>

            <Image style={{ width: '100%', height: '50%' }}
                source={{ uri: 'https://spotify-anheu.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F6.84e5a0be.webp&w=1920&q=75' }} />
                
            <View style={Styles.btnPlay}>
                <BotaoPlay width='18' cor='#181818' />
            </View>

            <Text style={Styles.tituloPlaylist}>{playlist.nome}</Text>
            <Text style={Styles.descricaoPlaylist}>{playlist.sobre}</Text>
        </View>
        // </Link>
    );
}

