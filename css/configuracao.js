import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 15
    },

    centralizar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    /* =-=-=-=-=-=-= opcaoConfiguracao.js =-=-=-=-=-=-= */
    mesmaLinha: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textoOpcao: {
        fontSize: 16,
        letterSpacing: 0.7,
        fontWeight: '600',
        color: '#fff',
        opacity: 1
    },

    margemTop: {
        marginTop: 30
    }
});
