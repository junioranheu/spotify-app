import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },

    player: {
        // backgroundColor: 'rgba(29, 185, 84, 0.8)',
        height: '100%',
        borderRadius: 5,
        width: '95%',

        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-= Esquerda =-=-=-=-=-=-=-=-=-=-=-=-=-=
    esquerda: {
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
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

    margemDireita:{
        marginRight: 20
    }
});
