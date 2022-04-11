import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    divPlaylists: {
        backgroundColor: 'pink',
        display: 'flex',
        flexWrap: 'wrap',

        width: '100%',
        marginTop: 25
    },

    playlist: {
        backgroundColor: 'rgb(24, 24, 24)',
        padding: 18,
        maxWidth: 250,
        borderRadius: 5,

        display: 'flex',
        flexDirection: 'column'
    },

    divThumbnail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    tituloPlaylist: {
        fontSize: 10,
        lineHeight: 10,
        fontWeight: '500',

        marginTop: 10
    },

    descricaoPlaylist:{
        fontSize: 8,
        lineHeight: 10,
        fontWeight: '400',

        marginTop: 3
    }
});
