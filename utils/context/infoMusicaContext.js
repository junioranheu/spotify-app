import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const InfoMusicaContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const InfoMusicaProvider = props => {
    const [infoMusicaContext, setInfoMusicaContext] = useState({});
    const [isModoAleatorioContext, setIsModoAleatorioContext] = useState(false);
    const [isModoLoopContext, setIsModoLoopContext] = useState(false);

    return (
        <InfoMusicaContext.Provider value={[
            infoMusicaContext, setInfoMusicaContext,
            isModoAleatorioContext, setIsModoAleatorioContext,
            isModoLoopContext, setIsModoLoopContext
        ]}>
            {props.children}
        </InfoMusicaContext.Provider>
    );
}
