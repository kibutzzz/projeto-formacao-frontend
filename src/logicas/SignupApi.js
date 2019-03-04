import { browserHistory } from 'react-router';

/*
    DISCLAIMER

    A Api que foi passada para a realização deste projeto não funciona de jeito algum, 
    acontecem problemas com:
        - senha (sql esta configurado com senha e a api sem )
        - algum erro relacionado com o Dialect 

    Para simulação foi utilizado a api upada no heroku, entretanta a mesma não está 
    completa e não possui as funcionalidades necessárias para implementar as funcionalidades
    deste projeto de formação.
    Portanto, funcionalidades relacionadas que requerem acesso a api não foram completamente 
    testadas e podem apresentar comportamentos indesejados.

*/


export default class SignupApi {


    static cadastrar(login, senha, urlPerfil) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ userName: login, password: senha, userProfilePhotoUrl: urlPerfil }),
            headers: new Headers({
                'Content-type': 'application/json',
                // 'X-AUTH-TOKEN': ""
            })
        };


        return fetch("http://localhost:3030/users/signup", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else if (response.status === 500) {
                    throw new Error('Usuaio já cadastrado');
                } else {
                    throw new Error('Oops, algo de errado aconteceu.');
                }

            })
            .then(() => {
                return browserHistory.push("/login");
            })
            .catch(erro => {
                return erro.message;
            });


    }
}