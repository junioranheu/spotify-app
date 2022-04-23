import React, { Fragment } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/playlists';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';

export default function Playlists({ playlist, navigation }) {
    return (
        <Fragment>
            <View style={Styles.playlist} id={playlist.playlistId}>
                <TouchableOpacity onPress={() => navigation.navigate('Fila')}>
                    <View style={Styles.divThumbnail}>
                        <Image
                            style={{ width: 170, height: 170 }}
                            source={{ uri: `${CONSTANTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlist.playlistId}.webp` }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={Styles.divInfos}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.tituloPlaylist}>{playlist.nome}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={Styles.descricaoPlaylist}>{playlist.sobre}</Text>
                </View>
            </View>
 
            <View style={Styles.margemDireita}></View>
        </Fragment>
    );
}

