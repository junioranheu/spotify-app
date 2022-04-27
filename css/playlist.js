import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerPrincipal: {
        // backgroundColor: 'pink',
        height: (Platform.OS === 'web' ? '100vh' : '100%'),
        width: '100%',
        backgroundColor: '#121212'
    },

    texto: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.7)',
    },

    textoBranco: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 1)',
    },

    imageBackground: {
        width: 280,
        height: 280,
        borderRadius: 0,

        // Shadow ios e android;
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6, },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
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
        marginTop: 15
    },

    margemTopSuperPequena: {
        marginTop: 3
    },

    margemEsquerda: {
        marginLeft: 25
    },

    placeholderTexto:{
        marginLeft: 25,
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});
