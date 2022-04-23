import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const ConfigContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const ConfigProvider = props => {
    const [isModoAleatorioContext, setIsModoAleatorioContext] = useState(false);
    const [isModoLoopContext, setIsModoLoopContext] = useState(false);

    return (
        <ConfigContext.Provider value={[isModoAleatorioContext, setIsModoAleatorioContext, isModoLoopContext, setIsModoLoopContext]}>
            {props.children}
        </ConfigContext.Provider>
    );
}
