import Svg, { Path } from 'react-native-svg';

export default function BotaoStop({ height, width, cor }) {
    return (
        <Svg role='img' height={height} width={width} viewBox='0 0 16 16'>
            <Path fill={cor} d='M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z'></Path>
        </Svg>
    )
}
