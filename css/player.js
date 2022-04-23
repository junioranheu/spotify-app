import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#121212', // Cor principal;
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },

    player: {
        // backgroundColor: 'rgba(29, 185, 84, 0.8)',
        height: (Platform.OS === 'web' ? 60 : '100%'),
        width: (Platform.OS === 'web' ? '95vw' : '95%'),
        borderRadius: 5,

        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    margemTopPequena: {
        // backgroundColor: 'red',
        marginTop: 3
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-= Esquerda =-=-=-=-=-=-=-=-=-=-=-=-=-=
    esquerda: {
        // backgroundColor: 'pink',
        width: '70%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 'auto',
        paddingLeft: 10,
    },

    imageBackground: {
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5
    },

    divInfoMusica: {
        // backgroundColor: 'pink',
        marginLeft: 8,
        maxWidth: 200
    },

    tituloMusica: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        fontWeight: '500'
    },

    banda: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        fontWeight: '500'
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-= Direita =-=-=-=-=-=-=-=-=-=-=-=-=-=
    direita: {
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
    },

    margemDireita: {
        marginRight: 20
    }
});
