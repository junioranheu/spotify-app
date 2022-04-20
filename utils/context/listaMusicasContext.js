import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

// Local storage no React Native: https://react-native-async-storage.github.io/async-storage/docs/usage/
// Criar o contexto para usar no provider abaixo;
export const ListaMusicasContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const ListaMusicasProvider = props => {
    const [listaMusica, setListaMusica] = useState(ListaMusicasStorage.get());

    return (
        <ListaMusicasContext.Provider value={[listaMusica, setListaMusica]}>
            {props.children}
        </ListaMusicasContext.Provider>
    );
}

// Funções para salvar em localStorage;
export const ListaMusicasStorage = {
    async set(data) {
        // console.log(data);
        let parsedData = JSON.stringify(data);

        try {
            await AsyncStorage.setItem('@listaMusicasContext', parsedData);
        } catch (e) {
            // saving error
        }
    },

    get() {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@listaMusicasContext');
                return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch (e) {
                // error reading value
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
            await AsyncStorage.removeItem('@listaMusicasContext');
        } catch (e) {
            // error reading value
        }
    }
}