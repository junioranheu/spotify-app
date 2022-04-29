import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Styles from '../css/buscar';
import StylesGlobal from '../css/global';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import { UsuarioContext } from '../utils/context/usuarioContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';

export default function Buscar({ navigation }) {
    const [usuarioContext] = useContext(UsuarioContext); // Contexto do usuário;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const refInputBuscar = useRef();

    const [isPesquisandoInput, setIsPesquisandoInput] = useState(false);
    const [palavraChave, setPalavraChave] = useState('');
    const [musicas, setMusicas] = useState({});
    // https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
    useEffect(() => {
        async function buscarMusicas(e) {
            const url = `${CONSTANTS_MUSICAS.API_URL_GET_POR_PALAVRA_CHAVE}/${palavraChave}`;
            const res = await fetch(url);
            const musicasPorPalavraChave = await res.json();
            setMusicas(musicasPorPalavraChave);
        }

        const delayDebounceFn = setTimeout(() => {
          console.log(palavraChave);
          buscarMusicas();
        }, 500)
    
        return () => clearTimeout(delayDebounceFn);
      }, [palavraChave])

    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    async function setarMusica(id) {
        if (!isPodeAvancar) {
            console.log('Não é possível avançar a música agora, aguarde um momento');
            return false;
        }

        // Se o usuário estiver deslogado não permita escutar a música;
        if (!usuarioContext?.usuarioId > 0) {
            Aviso('success', 'Opa ✋', 'Inicie uma sessão para escutar essa música', 5000);
            return false;
        }

        const url = `${CONSTANTS_MUSICAS.API_URL_GET_POR_ID}/${id}`;
        const res = await fetch(url)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);

        // Bloquear "avanço";
        setIsPodeAvancar(false);
    }

    return (
        <Fragment>
            {/* Parte superior */}
            <View style={Styles.divInputProcurar}>
                <TextInput
                    style={Styles.input}
                    onChange={(e) => setPalavraChave(e.nativeEvent.text)}
                    onFocus={() => setIsPesquisandoInput(true)}
                    onBlur={() => setIsPesquisandoInput(false)}
                    placeholder='Buscar'
                    placeholderTextColor='rgba(255, 255, 255, 0.8)'
                    ref={refInputBuscar}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Index')} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Text style={Styles.textoDois}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            {
                !isPesquisandoInput ? (
                    // Caso não tenha nenhum resultado
                    <View style={[StylesGlobal.containerPrincipal, Styles.centralizar]}>
                        <Text style={Styles.textoUm}>Encontre o que você quer ouvir</Text>
                        <Text style={[Styles.textoDois, Styles.margemTopPequena]}>Busque por artistas, bandas ou músicas</Text>

                        {/* Margem do footer */}
                        <MargemBotFooter />
                    </View>
                ) : (
                    // Caso tenham resultados
                    <ScrollView style={StylesGlobal.containerPrincipal}>
                        {
                            musicas?.length > 0 ? (
                                <View style={Styles.margemTopPequena}>
                                    {
                                        musicas.map((m, i) => (
                                            <MusicaRow
                                                key={m.musicaId}
                                                id={m.musicaId}
                                                foto={m.musicasBandas[0]?.bandas.foto}
                                                titulo={m.nome}
                                                banda={m.musicasBandas[0]?.bandas.nome}
                                                album={m.albunsMusicas[0]?.albuns.nome}
                                                tempo={m.duracaoSegundos}
                                                setarMusica={setarMusica}
                                            />
                                        ))
                                    }
                                </View>
                            ) : (
                                <View style={[Styles.margemTop, Styles.centralizar]}>
                                    <Text style={Styles.textoUm}>Nenhuma música foi encontrada</Text>
                                </View>
                            )
                        }

                        {/* Margem do footer */}
                        <MargemBotFooter />
                    </ScrollView>
                )
            }
        </Fragment>
    );
}



