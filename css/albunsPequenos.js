import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    divAlbunsPequenos: {
        // backgroundColor: 'red',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    albumPequeno: {
        marginTop: 8,
        backgroundColor: '#2B2A2D',
        width: '47.5%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },

    imageBackground: {
        width: 55,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    titulo: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 10,
        width: 100
    }
});
