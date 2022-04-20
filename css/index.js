import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        backgroundColor: '#121212',
        height: '100%',
        width: '100%',
        padding: 15
    },

    divOla: {
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row'
    },

    direita: {
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 'auto'
    },

    espacoIcones: {
        width: 25
    },

    margemTop: {
        // backgroundColor: 'red',
        marginTop: 30
    },

    margemTopPequena: {
        // backgroundColor: 'red',
        marginTop: 20
    },

    titulo: {
        fontSize: 23,
        fontWeight: '700',
        color: '#fff'
    },

    texto: {
        fontSize: 11,
        lineHeight: 12,
        fontWeight: '500',
        color: '#fff',
        opacity: 0.5,
        marginTop: 3
    }
});
