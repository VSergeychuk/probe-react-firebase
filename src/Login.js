import React, {Component} from 'react';
import { auth } from "./firebase";
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
        console.log('User email ', this.state.email);
        console.log('User password ', this.state.password);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    login(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log('Login user ', u)
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log('Sign up user ', u)
        }).catch((error) => {
            console.log(error);
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
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password"/>
                    </div>
                    <button type="submit" onClick={this.login} style={{marginTop: '10px', paddingLeft: '80px'}}>Login</button>
                    <button onClick={this.signup} style={{marginLeft: '25px', paddingRight: '80px'}}>Signup</button>
                </form>
            </div>
        );
    }
}