import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from '../../css/playlists';

export default function Playlists({ playlist }) {
    return (
        // <Link href={`/playlist/${playlist.playlistId}`} passHref>
        <View style={Styles.playlist} id={playlist.playlistId}>
            <View style={Styles.divThumbnail}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: `https://spotifyapi.azurewebsites.net/Upload/playlists/${playlist.playlistId}.webp` }}
                />
            </View>

            <Text style={Styles.tituloPlaylist}>{playlist.nome}</Text>
            <Text style={Styles.descricaoPlaylist}>{playlist.sobre}</Text>
        </View>
        // </Link>
    );
}

