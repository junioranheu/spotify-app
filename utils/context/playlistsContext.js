import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const PlaylistsContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const PlaylistsProvider = props => {
    const [playlistContext, setPlaylistsContext] = useState({});

    return (
        <PlaylistsContext.Provider value={[playlistContext, setPlaylistsContext]}>
            {props.children}
        </PlaylistsContext.Provider>
    );
}
