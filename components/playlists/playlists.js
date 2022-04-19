import React, { Fragment } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/playlists';

export default function Playlists({ playlist, navigation }) {
    return (
        <Fragment>
            <View style={Styles.playlist} id={playlist.playlistId}>
                <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                    <View style={Styles.divThumbnail}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: `https://spotifyapi.azurewebsites.net/Upload/playlists/${playlist.playlistId}.webp` }}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={Styles.tituloPlaylist}>{playlist.nome}</Text>
                <Text style={Styles.descricaoPlaylist}>{playlist.sobre}</Text>
            </View>

            <View style={Styles.margemDireita}></View>
        </Fragment>
    );
}

