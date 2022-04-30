import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },

    modalView: {
        // backgroundColor: 'rgba(0, 0, 0, 0.9)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonClose: {
        backgroundColor: '#2196F3',
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});
