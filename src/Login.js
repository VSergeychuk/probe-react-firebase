import React, {Component} from 'react';
import {auth} from "./firebase";
import './App.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleError(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Check your password, please.');
        } else {
            alert(errorMessage);
            console.log(error);
        }
    }

    login(event) {
        event.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log('User ', u.user.email, ' successfully log in.',)
        }).catch((error) => {
            this.handleError(error);
        });
    }

    signup(event) {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log('User ', u.user.email, ' successfully sign up.')
        }).catch((error) => {
            this.handleError(error);
        });
    }

    render() {
        return (
            <div>
                <form>
                    <br/>
                    <div>
                        <label style={{color: 'green'}}>Email address: </label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label style={{marginLeft: '30px', color: 'green'}}>Password: </label>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               name="password"/>
                    </div>
                    <button type="submit" onClick={this.login} style={{marginTop: '10px', paddingRight: '40px'}}>Login
                    </button>
                    <button onClick={this.signup} style={{marginLeft: '25px', paddingRight: '20px'}}>Signup</button>
                    <button onClick={window.close} style={{marginLeft: '25px', paddingRight: '40px'}}>Quit</button>
                </form>
            </div>
        );
    }
}