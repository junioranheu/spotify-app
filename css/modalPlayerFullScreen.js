import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    modalView: {
        // backgroundColor: 'rgba(0, 0, 0, 0.9)', // Definido em modalPlayerFullScreen.js
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 0.85,
    },

    margemTopGrande: {
        // backgroundColor: 'red',
        marginTop: 50
    },

    margemTop: {
        // backgroundColor: 'red',
        marginTop: 30
    },

    margemTopPequena: {
        // backgroundColor: 'red',
        marginTop: 20
    },

    margemTopSuperPequena: {
        // backgroundColor: 'red',
        marginTop: 10
    },

    titulo: {
        fontSize: 18.5,
        letterSpacing: 0.4,
        fontWeight: '700',
        color: '#fff'
    },

    texto: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },

    textoPequeno: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)'
    },

    divBottom: {
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.15
    },

    imageBackground: {
        width: 200,
        height: 200,
        borderRadius: 0,

        // Shadow ios e android;
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6, },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },

    mesmaLinha: {
        // backgroundColor: 'blue',
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});
