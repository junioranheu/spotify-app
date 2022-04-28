import { Dimensions, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerPrincipal: {
        // backgroundColor: 'pink',
        height: (Platform.OS === 'web' ? '100vh' : '100%'),
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
        color: '#fff'
    },

    divTituloMusica: {
        // backgroundColor: 'pink',
        maxWidth: 300
    },

    nomeBanda: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        opacity: 0.8
    },

    imageBackground: {
        width: (Dimensions.get('window').width <= 360 ? 200 : 350),
        height: (Dimensions.get('window').width <= 360 ? 200 : 350),
        borderRadius: 0,

        // Shadow ios e android;
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6, },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
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

    margemTopPequena: {
        marginTop: 10
    },

    margemEsquerdaPequena: {
        marginLeft: 10
    },

    margemDireitaPequena: {
        marginRight: 10
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
    },

    spanTempoAtualProgressBar: {
        // color: 'pink',
        marginRight: 'auto',
        fontSize: 11,
        fontWeight: '500',
        color: '#fff',
        opacity: 0.6
    },

    spanTempoMaximoProgressBar: {
        // color: 'pink',
        marginLeft: 'auto',
        fontSize: 11,
        fontWeight: '500',
        color: '#fff',
        opacity: 0.6
    },
});
