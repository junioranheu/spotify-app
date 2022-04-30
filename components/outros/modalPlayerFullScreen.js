import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useContext } from 'react';
import { ImageBackground, Modal, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Aleatorio from '../../components/svg/aleatorio';
import Fila from '../../components/svg/fila';
import Loop from '../../components/svg/loop';
import StylesGlobal from '../../css/global';
import Styles from '../../css/modalPlayerFullScreen';
import ImgCinza from '../../static/image/outros/cinza.webp';
import { InfoMusicaContext } from '../../utils/context/infoMusicaContext';

export default function ModalPlayerFullScreen({ isVisivel, setIsModalVisivel, corDominante, imagemBanda, musicaContext }) {
    const navigation = useNavigation();

    const [
        infoMusicaContext, setInfoMusicaContext,
        isModoAleatorioContext, setIsModoAleatorioContext,
        isModoLoopContext, setIsModoLoopContext
    ] = useContext(InfoMusicaContext); // Context da música que está tocando, contendo suas informações;

    // Modo aleatório;
    function handleModoAleatorio() {
        setIsModoAleatorioContext(!isModoAleatorioContext);
    }

    // Modo loop;
    function handleModoLoop() {
        setIsModoLoopContext(!isModoLoopContext);
    }

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

                    {/* Informações */}
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

                    <View style={[Styles.mesmaLinha, Styles.margemTopGrande]}>
                        <TouchableOpacity onPress={() => handleModoAleatorio()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            <Aleatorio height={26} width={26} cor={isModoAleatorioContext ? '#20D660' : 'rgba(255, 255, 255, 0.9)'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleModoLoop()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            <Loop height={26} width={26} cor={isModoLoopContext ? '#20D660' : 'rgba(255, 255, 255, 0.9)'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => [navigation.navigate('Fila'), setIsModalVisivel(!isVisivel)]} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            <Fila height={26} width={26} cor={'rgba(255, 255, 255, 0.9)'} />
                        </TouchableOpacity>
                    </View>
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

