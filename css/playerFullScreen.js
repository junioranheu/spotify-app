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

    fixarBot: {
        // backgroundColor: 'pink',
        display: 'flex',
        marginTop: 'auto'
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
    }
});
