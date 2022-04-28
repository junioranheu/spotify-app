import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import MargemBotFooter from '../components/outros/margemBotFooter';
import Styles from '../css/fila';
import StylesGlobal from '../css/global';
import WaitGif from '../static/image/outros/wait.gif';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import { UsuarioContext } from '../utils/context/usuarioContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';
import Aviso from '../utils/outros/aviso';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';

export default function Fila({ navigation }) {
    const [usuarioContext] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

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

    useEffect(() => {
        // Aguardar x segundos para poder avançar novamente, para evitar bugs;
        const timeOut = window.setTimeout(() => {
            setIsPodeAvancar(true);
        }, 100);

        return () => window.clearTimeout(timeOut);
    }, [isPodeAvancar]);

    return (
        <Fragment>
            {
                !listaMusicasContext?.length && !musicaContext?.musicaId ? (
                    <View style={[StylesGlobal.containerPrincipal, Styles.centralizar]}>
                        <View style={Styles.centralizar}>
                            <Image source={WaitGif} style={Styles.gifWait}></Image>
                            <Text style={Styles.subtitulo}>Sem próximas músicas na sua fila</Text>
                            <Text style={[Styles.subtituloMenor, Styles.margemTopPequena]}>Volte ao início e encontre uma nova música {EmojiAleatorio()}</Text>
                        </View>
                    </View>
                ) : (
                    <ScrollView style={StylesGlobal.containerPrincipal}>
                        {/* Música atual */}
                        <View>
                            <Text style={Styles.titulo}>Sua fila</Text>

                            {
                                musicaContext?.musicaId > 0 && (
                                    <Text style={Styles.subtitulo}>Em reprodução</Text>
                                )
                            }

                            <View style={Styles.margemTopPequena}>
                                {
                                    musicaContext?.musicaId > 0 ? (
                                        <MusicaRow
                                            id={musicaContext.musicaId}
                                            foto={musicaContext.musicasBandas[0]?.bandas.foto}
                                            titulo={musicaContext.nome}
                                            banda={musicaContext.musicasBandas[0]?.bandas.nome}
                                            album={musicaContext.albunsMusicas[0]?.albuns.nome}
                                            tempo={musicaContext.duracaoSegundos}
                                            setarMusica={null}
                                        />
                                    ) : (
                                        <View>
                                            <Text style={Styles.subtitulo}>Nenhuma música em reprodução agora</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>

                        {/* Próximas músicas na fila */}
                        <View style={Styles.margemTop}>
                            <Text style={Styles.titulo}>Próximas músicas</Text>

                            <View style={Styles.margemTopPequena}>
                                {
                                    // Bug bizarro que tive que por o length > 1, por algum motivo, o 0 não funcionou nesse caso...
                                    listaMusicasContext?.length > 1 ? (
                                        <Fragment>
                                            {
                                                listaMusicasContext.filter(x => x.musicaId !== musicaContext?.musicaId).map((m, i) => (
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
                                        </Fragment>
                                    ) : (
                                        <View>
                                            <Text style={Styles.subtitulo}>Sem próximas músicas na sua fila</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>

                        {/* Margem do footer */}
                        <MargemBotFooter />
                    </ScrollView>
                )
            }
        </Fragment>
    );
}

