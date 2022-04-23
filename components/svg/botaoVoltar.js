import Svg, { Path } from 'react-native-svg';

export default function BotaoVoltar({ height, width, cor }) {
    return (
        <Svg role='img' height={height} width={width} viewBox='0 0 16 16'>
            <Path fill={cor} d='M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z'></Path>
        </Svg>
    )
}
 