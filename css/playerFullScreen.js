import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerPrincipal: {
        // backgroundColor: 'pink',
        height: '100%',
        width: '100%'
    },

    centralizar: {
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoMuitoPequeno: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },

    texto: {
        fontSize: 23,
        fontWeight: '700',
        color: '#fff',
    },

    tituloMusica: {
        fontSize: 23,
        fontWeight: '700',
        color: '#fff',
    },

    nomeBanda: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        opacity: 0.8
    },

    imageBackground: {
        width: 350,
        height: 350,
        borderRadius: 0
    },

    mesmaLinha: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center'
    },

    margemTopGrande: {
        marginTop: 50
    },

    margemTop: {
        marginTop: 30
    },

    flexEsquerda: {
        // backgroundColor: 'pink',
        marginRight: 'auto'
    },

    flexCentro: {
        // backgroundColor: 'pink',
        margin: 'auto'
    },

    flexDireita: {
        // backgroundColor: 'pink',
        marginLeft: 'auto'
    },

    divOutrosElementos: {
        // backgroundColor: 'pink',
        paddingLeft: 15,
        paddingRight: 15
    },

    divBotoesGrandes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    circuloBotaoPlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 32,
        height: 60,
        width: 60,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    divBotoesPequenos: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
