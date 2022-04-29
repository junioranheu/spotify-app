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

    subtituloMenor: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fff',
        opacity: 0.7
    },  

    margemTop: {
        // backgroundColor: 'red',
        marginTop: 24
    },

    margemTopPequena: {
        // backgroundColor: 'red',
        marginTop: 8
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-= musicaRow =-=-=-=-=-=-=-=-=-=-=-=-=-=
    divMusica: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
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
        marginLeft: 10,
        maxWidth: 250
    },

    tituloMusica: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        fontWeight: '600'
    },

    banda: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        fontWeight: '500'
    },

    direita: {
        // backgroundColor: 'pink',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },

    corVerde: {
        color: 'rgba(29, 185, 84, 0.8)'
    },

    mesmaLinha: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },

    equaliser: {
        height: 12,
        width: 12,
        marginRight: 5,
        marginLeft: 2
    },

    centralizar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
