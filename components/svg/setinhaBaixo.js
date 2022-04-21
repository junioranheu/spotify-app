import Svg, { Path } from 'react-native-svg';

export default function SetinhaBaixo({ height, width, cor }) {
    return (
        <Svg role='img' height={height} width={width} viewBox='0 0 16 16'>
            <Path fill={cor} d='M14 6l-6 6-6-6h12z'></Path>
        </Svg>
    )
}


