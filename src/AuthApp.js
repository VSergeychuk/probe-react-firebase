import React, {Component} from 'react';
import {database} from "./firebase";
import './App.css';

class AuthApp extends Component {

    constructor(props) {
        super(props);
        this.dataRef = null;
        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user, ' is connected now ...');
            if (user) {
                this.setState({user});
            } else {
                this.setState({user: null});
            }
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.user ? (<Home/>) : (<Login/>)}
            </div>
        );
    }
}

export default AuthApp;
