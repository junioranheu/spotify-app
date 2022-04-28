import LottieView from 'lottie-react-native';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import CoracaoJson from '../../static/lottieFiles/heart.json';
import Coracao from '../svg/coracao';
import CoracaoPreenchido from '../svg/coracaoPreenchido';

// https://github.com/louaySleman/react-native-exploding-heart/blob/main/lib/index.js
// Junção do coração do twitter (link acima) + CoracaoPreenchido.js e Coracao.js;
const CoracaoFinal = ({ status, width }) => {
    const refLottieView = useRef();
    const [isFavorite, setFavorite] = useState(status);

    useEffect(() => {
        // Aguardar x segundos para evitar bugs;
        const timeOut = window.setTimeout(() => {
            if (isFavorite) {
                refLottieView?.current?.play();
            } else {
                refLottieView?.current?.reset();
            }
        }, 100);

        return () => {
            // Unmount;
            window.clearTimeout(timeOut);
            refLottieView?.current?.reset();
        }
    }, [isFavorite]);

    function handlePress() {
        setFavorite(!isFavorite);
    }

    return (
        <Fragment>
            {
                Platform.OS === 'web' ? (
                    // Coração "normal" para a web
                    <TouchableOpacity onPress={() => handlePress()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                        {
                            isFavorite ? (
                                <CoracaoPreenchido height={22} width={22} cor={'#20D660'} />
                            ) : (
                                <Coracao height={22} width={22} cor={'rgba(255, 255, 255, 0.9)'} />
                            )
                        }
                    </TouchableOpacity>
                ) : (
                    // Coração do twitter
                    <TouchableOpacity
                        onPress={() => handlePress()}
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        activeOpacity={1}
                        style={{
                            // backgroundColor: 'pink',
                            width: width,
                            height: width
                        }}
                    >
                        <LottieView
                            autoPlay={false}
                            loop={false}
                            resizeMode='contain'
                            // style={{ width: width, height: width }}
                            ref={refLottieView}
                            source={CoracaoJson}
                            speed={1.5}
                        />
                    </TouchableOpacity>
                )
            }
        </Fragment>
    );
};

export default CoracaoFinal;


