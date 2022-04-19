import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(18, 18, 18, 0.97)',

        height: 90,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },

    divIcone: {
        // backgroundColor: 'pink',
        paddingTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    texto: {
        paddingTop: 5,
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        fontWeight: '500'
    }
});
