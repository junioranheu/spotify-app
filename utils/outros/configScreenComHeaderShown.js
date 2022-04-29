
export default function ConfigScreenComHeaderShown(titulo, animacao) {
    // Opções para Stack.Screen com headerShown true;
    const configScreenComHeaderShown = {
        headerShown: true,
        animation: animacao,
        title: titulo,
        headerStyle: { backgroundColor: '#191919' },
        headerTintColor: 'rgba(255, 255, 255, 1)',
        headerTitleStyle: { fontWeight: '700', fontSize: 15 },
        headerBackTitle: '',
    }

    return configScreenComHeaderShown;
}
