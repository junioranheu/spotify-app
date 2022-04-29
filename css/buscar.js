import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    centralizar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoUm: {
        fontSize: 20,
        letterSpacing: 0.7,
        fontWeight: '700',
        color: '#fff',
        opacity: 1
    },

    textoDois: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        opacity: 0.9
    },

    margemTop: {
        marginTop: 30
    },

    margemTopPequena: {
        marginTop: 10
    },

    divInputProcurar: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#191919',
        padding: 10
    },

    input: {
        backgroundColor: '#242424',
        borderColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
});
