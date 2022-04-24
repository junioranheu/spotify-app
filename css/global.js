import { Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#121212', // Cor principal;
        paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
    },

    containerPrincipal: {
        // backgroundColor: 'pink',
        backgroundColor: '#121212', // Cor principal;
        height: '100%',
        width: '100%',
        padding: 15
    },

    margemBotFooter: {
        marginBottom: 40
    },

    esconder: {
        display: 'none'
    },

    svg16px: {
        minWidth: 16,
        minHeight: 16,
        maxWidth: 16,
        maxHeight: 16
    },
});
