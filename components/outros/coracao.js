import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Easing, Keyframe } from 'react-native-reanimated';

export default function Coracao({ isMusicaCurtida }) {
    // const keyframe = new Keyframe({
    //     0: {
    //         backgroundPosition: 'left'
    //     },
    //     100: {
    //         backgroundPosition: 'right'
    //     },
    // })

    const keyframe = new Keyframe({
        0: {
            transform: [{ rotate: '0deg' }],
        },
        45: {
            transform: [{ rotate: '100deg' }],
            easing: Easing.exp,
        },
        100: {
            transform: [{ rotate: '45deg' }],
        },
    })

    const Styles = StyleSheet.create({
        coracao: {
            // backgroundImage: 'url(../static/image/outros/coracao-animacao.png)'
            backgroundColor: 'pink'
        }
    });

    return (
        // <Animated.View entering={(isMusicaCurtida ? enteringAnimation : null)}>
        <Animated.View entering={keyframe}>
            <div style={[Styles.coracao]}></div>
        </Animated.View>
    )
}