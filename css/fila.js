import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    titulo: {
        fontSize: 23,
        fontWeight: '700',
        color: '#fff'
    },

    subtitulo: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        opacity: 0.7
    },

    margemTop: {
        // backgroundColor: 'red',
        marginTop: 30
    },

    margemTopPequena: {
        // backgroundColor: 'red',
        marginTop: 5
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-= musicaRow =-=-=-=-=-=-=-=-=-=-=-=-=-=
    divMusica: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },

    imageBackground: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0
    },

    divInfoMusica: {
        // backgroundColor: 'pink',
        marginLeft: 8,
        maxWidth: 200
    },

    tituloMusica: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        fontWeight: '500'
    },

    banda: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        fontWeight: '500'
    },
});
