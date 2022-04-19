import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(18, 18, 18, 0.97)',

        height: 80,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },

    divIcone: {
        // backgroundColor: 'pink',
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    texto: {
        paddingTop: 5,
        color: '#fff',
        fontSize: 12,
        fontWeight: '500'
    }
});
