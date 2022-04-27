import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerPrincipal: {
        // backgroundColor: 'pink',
        height: (Platform.OS === 'web' ? '100vh' : '100%'),
        width: '100%'
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

    imageBackground: {
        width: 280,
        height: 280,
        borderRadius: 0
    },

    centralizar: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    esconderOcupandoEspaco: {
        opacity: 0
    },

    mesmaLinha: {
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row'
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
});
