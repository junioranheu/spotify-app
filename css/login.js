import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerPrincipal: {
        // backgroundColor: 'pink',
        backgroundColor: '#121212', // Cor principal;
        height: '100%',
        width: '100%',
        padding: 0
    },

    centralizar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    conteudo: {
        height: '80%'
    },

    ajustarLinearGradient: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    flexBottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
    },

    backgroundImage: {
        width: '100%',
        height: '100%'
    },

    margemTop: {
        marginTop: 30
    },

    margemGrande: {
        marginTop: 50
    },

    margemTopPequena: {
        marginTop: 20
    },

    margemTopSuperPequena: {
        marginTop: 5
    },

    titulo: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff'
    },

    label: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },

    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'gray',
        color: '#000',
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
});
