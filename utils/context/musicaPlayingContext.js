import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const MusicaPlayingContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const MusicaPlayingProvider = props => {
    const [musicaPlaying, setMusicaPlaying] = useState({});

    return (
        <MusicaPlayingContext.Provider value={[musicaPlaying, setMusicaPlaying]}>
            {props.children}
        </MusicaPlayingContext.Provider>
    );
}
