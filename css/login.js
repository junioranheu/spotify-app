import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    centralizar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
