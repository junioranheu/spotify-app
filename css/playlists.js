import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    divPlaylists: {
        // backgroundColor: 'pink',
        display: 'flex',
        width: '100%'
    },

    playlist: {
        // backgroundColor: 'pink',
        padding: 18,
        maxWidth: 250,
    },

    tituloPlaylist: {
        fontSize: 13,
        lineHeight: 13,
        fontWeight: '700',
        color: '#fff',
        marginTop: 13
    },

    descricaoPlaylist: {
        fontSize: 11,
        lineHeight: 12,
        fontWeight: '500',
        color: '#fff',
        opacity: 0.5,
        marginTop: 3
    }
});
