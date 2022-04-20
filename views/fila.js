import React, { Fragment, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MusicaRow from '../components/fila/musicaRow';
import Styles from '../css/fila';
import StylesGlobal from '../css/global';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';

export default function Fila({ navigation }) {
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    async function setarMusica(e) {
        // Se o usuário estiver deslogado;
        // if (!isAuth) {
        //     Aviso.custom('Inicie uma sessão para escutar essa música', 5000);
        //     return false;
        // }

        const id = e.currentTarget.id;
        // console.log(id);

        const url = `${CONSTANTS.API_URL_GET_POR_ID}/${id}`;
        const res = await fetch(url)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    return (
        <ScrollView style={StylesGlobal.containerPrincipal}>
            {/* Música atual */}
            <View>
                <Text style={Styles.titulo}>Sua fila</Text>
                <Text style={Styles.subtitulo}>Em reprodução</Text>

                <View style={Styles.margemTopPequena}>
                    {
                        musicaContext?.musicaId > 0 ? (
                            <MusicaRow
                                i={1}
                                id={musicaContext.musicaId}
                                foto={musicaContext.musicasBandas[0]?.bandas.foto}
                                titulo={musicaContext.nome}
                                banda={musicaContext.musicasBandas[0]?.bandas.nome}
                                album={musicaContext.albunsMusicas[0]?.albuns.nome}
                                tempo={musicaContext.duracaoSegundos}
                                setarMusica={setarMusica}
                                isDesativarUm={true}
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
                        listaMusicasContext?.length > 0 ? (
                            <Fragment>
                                {
                                    listaMusicasContext.filter(x => x.musicaId !== musicaContext?.musicaId).map((m, i) => (
                                        <MusicaRow
                                            key={m.musicaId}
                                            i={(i + 2)} // A ordem tem que começar no 2;
                                            id={m.musicaId}
                                            foto={m.musicasBandas[0]?.bandas.foto}
                                            titulo={m.nome}
                                            banda={m.musicasBandas[0]?.bandas.nome}
                                            album={m.albunsMusicas[0]?.albuns.nome}
                                            tempo={m.duracaoSegundos}
                                            setarMusica={setarMusica}
                                            isDesativarUm={true}
                                        />
                                    ))
                                }
                            </Fragment>
                        ) : (
                            <View>
                                <Text style={Styles.subtitulo}>Sem músicas na sua fila de reprodução</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}

