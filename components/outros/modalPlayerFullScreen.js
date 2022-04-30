import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Styles from '../../css/modalPlayerFullScreen';

export default function ModalPlayerFullScreen({ isVisivel, setIsModalVisivel, corDominante }) {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isVisivel}
        >
            <View style={Styles.centeredView}>
                <View style={[Styles.modalView, {backgroundColor: corDominante}]}>
                    <Text style={Styles.modalText}>Hello World!</Text>
                    <Pressable
                        style={[Styles.button, Styles.buttonClose]}
                        onPress={() => setIsModalVisivel(!isVisivel)}
                    >
                        <Text style={Styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

