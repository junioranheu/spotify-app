import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    centralizar: {
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    margemTopGrande: {
        marginTop: 50
    },

    fixarBot: {
        // backgroundColor: 'pink',
        display: 'flex',
        marginTop: 'auto'
    }
});
