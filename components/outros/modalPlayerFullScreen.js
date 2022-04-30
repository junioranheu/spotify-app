import React, { Fragment } from 'react';
import { ImageBackground, Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import StylesGlobal from '../../css/global';
import Styles from '../../css/modalPlayerFullScreen';
import ImgCinza from '../../static/image/outros/cinza.webp';

export default function ModalPlayerFullScreen({ isVisivel, setIsModalVisivel, corDominante, imagemBanda, musicaContext }) {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isVisivel}
        >
            <SafeAreaView style={StylesGlobal.safeAreaView}></SafeAreaView>

            <View style={[Styles.centeredView, { backgroundColor: corDominante }]}>
                {/* Div principal */}
                <View style={Styles.modalView}>
                    {/* Imagem */}
                    <View style={[Styles.centralizar, Styles.margemTopGrande]}>
                        {
                            imagemBanda ? (
                                <ImageBackground source={{ uri: imagemBanda }} style={Styles.imageBackground}></ImageBackground>
                            ) : (
                                <ImageBackground source={ImgCinza} style={Styles.imageBackground}></ImageBackground>
                            )
                        }
                    </View>

                    <Text style={[Styles.titulo, Styles.margemTopPequena]}>{musicaContext?.nome}</Text>
                    <Text style={[Styles.textoPequeno, Styles.margemTopSuperPequena]}>
                        {musicaContext.musicasBandas[0]?.bandas.nome}

                        {
                            musicaContext.albunsMusicas[0]?.albuns.nome && (
                                <Fragment>
                                    &nbsp;•&nbsp;
                                    {musicaContext.albunsMusicas[0]?.albuns.nome}
                                </Fragment>
                            )
                        }
                    </Text>
                </View>

                {/* Div bottom */}
                <View style={Styles.divBottom}>
                    <Pressable onPress={() => setIsModalVisivel(!isVisivel)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                        <Text style={Styles.texto}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

