import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

// Local storage no React Native: https://react-native-async-storage.github.io/async-storage/docs/usage/
// Criar o contexto para usar no provider abaixo;
export const MusicaContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const MusicaProvider = props => {
    const [musica, setMusica] = useState(MusicaStorage.get());

    return (
        <MusicaContext.Provider value={[musica, setMusica]}>
            {props.children}
        </MusicaContext.Provider>
    );
}

// Funções para salvar em localStorage;
export const MusicaStorage = {
    async set(data) {
        // console.log(data);
        let parsedData = JSON.stringify(data);

        try {
            await AsyncStorage.setItem('@musicaContext', parsedData);
        } catch (e) {
            console.log('Ocorreu um erro ao salvar o local storage');
        }
    },

    get() {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@musicaContext');
                return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch (e) {
                console.log('Ocorreu um erro ao ler o local storage');
            }
        }

        if (!getData) {
            return null;
        }

        // console.log(getData);
        return getData;
    },

    async delete() {
        try {
            await AsyncStorage.removeItem('@musicaContext');
        } catch (e) {
            console.log('Ocorreu um erro ao deletar o local storage');
        }
    }
}