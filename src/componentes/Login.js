import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { msg: this.props.location.query.msg };
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ userName: this.login.value, password: this.senha.value }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        
        // fetch('https://instalura-api.herokuapp.com/api/public/login',requestInfo)
        fetch('http://localhost:3030/users/login', requestInfo)
            .then(response => {                
                if (response.ok) {
                    for(var [nome, valor] of response.headers.entries()){
                        if(nome === 'x-access-token') {
                            return valor;
                        }
                    }
                    //caso o token não seja encontrado
                    throw new Error ("Não foi possivel autenticar devido a um erro com o servidor");
                    
                } else {
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                browserHistory.push('/timeline');
            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}