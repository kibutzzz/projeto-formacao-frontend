import { listagem, comentario, like, notifica, apaga } from '../actions/actionCreator';

export default class TimelineApi {
    static lista(urlPerfil) {
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                });
        }
    }

    static comenta(fotoId, textoComentario) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: textoComentario }),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("não foi possível comentar");
                    }
                })
                .then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario));
                    return novoComentario;
                });
        }
    }

    static like(fotoId) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("não foi possível realizar o like da foto");
                    }
                })
                .then(liker => {
                    dispatch(like(fotoId, liker));
                    return liker;
                });
        }
    }

    static pesquisa(login) {
        return dispatch => {
            fetch(`http://localhost:3030/${login}/photos`)
                .then(response => {
                    return response.json();
                })
                .then(fotos => {
                    dispatch(notifica("Usuario encontrado"));
                    if (fotos.length === 0) {
                        dispatch(notifica('Usuario não possui fotos'));
                    }
                    dispatch(listagem(fotos));
                    return fotos;
                }).catch(erro => dispatch(notifica("Usuario não encontrado")));
        }
    }

    static apaga(fotoId) {
        return dispatch => {
            fetch(`http://localhost:3030/photos/${fotoId}`,
                {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-type': 'application/json',
                        'x-access-token': localStorage.getItem('auth-token')
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return "Apagando";
                        //Best practice?
                    } else if (response.status === 404) {
                        throw new Error("foto não encontrada no servidor");
                    } else if (response.status === 403) {
                        throw new Error("Você não pode apagar esta foto");
                    } else {
                        throw new Error("Não foi possivel apagar a foto");
                    }
                })
                .then(result => {
                    dispatch(apaga(fotoId));
                    dispatch(notifica("Foto deletada"));
                    return result;
                })
                .catch((erro) => {
                    dispatch(notifica(erro.message))

                });


        }

    }

}