import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../../css/albunsPequenos';

export default function AlbunsPequenos() {
    return (
        <View style={Styles.divAlbunsPequenos}>
            <View style={Styles.albumPequeno}>
                <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>

            <View style={Styles.albumPequeno}>
                <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>

            <View style={Styles.albumPequeno}>
                <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>

            <View style={Styles.albumPequeno}>
                <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>

            <View style={Styles.albumPequeno}>
            <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>

            <View style={Styles.albumPequeno}>
                <Text style={Styles.titulo}>Foto</Text>
                <Text style={Styles.titulo}>1</Text>
            </View>
        </View>
    );
}

