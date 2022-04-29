import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../css/albunsPequenos';
import Foto1 from '../../static/image/albunsPequenos/albumPequeno1.webp';
import Foto2 from '../../static/image/albunsPequenos/albumPequeno2.webp';
import Foto3 from '../../static/image/albunsPequenos/albumPequeno3.webp';
import Foto4 from '../../static/image/albunsPequenos/albumPequeno4.webp';
import Foto5 from '../../static/image/albunsPequenos/albumPequeno5.webp';
import Foto6 from '../../static/image/albunsPequenos/albumPequeno6.webp';
import Aviso from '../../utils/outros/aviso';

export default function AlbunsPequenos() {

    const albunsPequenos = [
        { id: 1, foto: Foto1, titulo: 'Músicas curtidas', url: '' },
        { id: 2, foto: Foto2, titulo: 'Oasis', url: '' },
        { id: 3, foto: Foto3, titulo: 'Lofi Fruits Music', url: '' },
        { id: 4, foto: Foto4, titulo: 'Engenheiros do Havaii', url: '' },
        { id: 5, foto: Foto5, titulo: 'Carro', url: '' },
        { id: 6, foto: Foto6, titulo: 'Boas', url: '' }
    ];

    return (
        <View style={Styles.divAlbunsPequenos}>
            {albunsPequenos.map((item, key) => {
                return (
                    <TouchableOpacity
                        style={Styles.albumPequeno}
                        key={item.id}
                        onPress={() => Aviso('success', `Não é possível entrar no album "${item.titulo}" 😞`, 'Essa função ainda não foi desenvolvida', 5000)}
                    >
                        <Image source={item.foto} style={Styles.imageBackground}></Image>
                        <Text style={Styles.titulo}>{item.titulo}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

