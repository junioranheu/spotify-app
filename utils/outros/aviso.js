import Toast from 'react-native-toast-message';

export default function aviso(tipo, titulo, desc, tempo) {
    function toast(tipo, titulo, desc, tempo) {
        Toast.show({
            type: tipo,
            text1: titulo,
            text2: desc,
            visibilityTime: tempo,
            autoHide: true
        });
    }

    return toast(tipo, titulo, desc, tempo);
}

