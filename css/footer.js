import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    footer: {
        backgroundColor: 'rgba(18, 18, 18, 1)',
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
    },

    margemTop: {
        backgroundColor: 'rgba(18, 18, 18, 0.97)',
        minHeight: 100,
        height: 100
    }
});
