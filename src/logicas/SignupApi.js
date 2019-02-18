import { browserHistory } from 'react-router';

export default class SignupApi {


    static cadastrar(login, senha, urlPerfil) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ login, senha, urlPerfil }),
            headers: new Headers({
                'Content-type': 'application/json',
                'X-AUTH-TOKEN': ""
            })
        };


        return fetch("http://localhost:8080/usuarios", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('não foi possível fazer o login');
                }

            })
            .then(() => {
                return browserHistory.push("/login");
            })
            .catch(erro => {
                console.log(erro);
            });


    }
}