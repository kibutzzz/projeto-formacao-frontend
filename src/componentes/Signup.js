import React, { Component } from 'react';
import SignupApi from '../logicas/SignupApi';

export default class Signup extends Component {

    constructor() {
        super();
        this.state = { erros: [] };
        this.confereInput = this.confereInput.bind(this);
    }

    envia(event) {
        event.preventDefault();
        //Alguma outra maneira de limpar os erros?
        // this.state.erros = [];
        let erros = [];

        erros.push(this.confereInput(
            this.urlEhValida(this.url.value),
            { id: 1, msg: "Url de perfil não é válida" }
        ));
        erros.push(this.confereInput(
            this.senha.value !== this.confirmacao.value,
            { id: 2, msg: "Senha não confere" }
        ));
        erros.push(this.confereInput(
            this.senha.value === this.login.value,
            { id: 3, msg: "Senha igual ao username" }
        ));


        erros = erros.filter(erro => erro !== undefined);
        
        if (erros.length === 0) {
            this.cadastrar(this.login.value, this.senha.value, this.url.value).then((erro)=> {
                erros.push({id: 4, msg: erro});
                this.setState({erros});
            });
          
        }
        
        this.setState({ erros: erros });
        this.login.focus();
        this.login.value = '';
        this.senha.value = '';
        this.confirmacao.value = '';
        this.url.value = '';
    }

    cadastrar(login, senha, urlPerfil) {
        return SignupApi.cadastrar(login, senha, urlPerfil);
    }

    urlEhValida(url) {
        //Não entendi direito essa validação de imagem. 
        //Não ficou claro no enunciado de onde é essa imagem e para que serve
        let regex = /(http(s)?:\/\/)?.{3,}\..{2,}(\..{2,}\/)/;
        return !regex.test(url);
    }

    confereInput(expressao, erroObj) {
        if (expressao) {
            return erroObj;
        }
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                {
                    this.state.erros.map(erro => {
                        return (<div>
                            <p style={{color: 'red', margin: 0}}>{erro.msg}</p>
                        </div>);
                    })
                }
                <form onSubmit={this.envia.bind(this)}>
                    <label>Login</label><input type="text" ref={(input) => this.login = input} required />
                    <label>Senha</label><input type="password" ref={(input) => this.senha = input} required />
                    <label>Confirmação</label><input type="password" ref={(input) => this.confirmacao = input} required />
                    <label>Url do perfil</label><input type="text" ref={(input) => this.url = input} required />

                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }

}