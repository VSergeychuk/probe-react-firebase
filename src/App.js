import React, {Component} from 'react';
import { auth } from "./firebase";
import Login from "./Login";
import Connect from "./Connect";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
        };
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
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
                {this.state.user ? (<Connect/>) : (<Login/>)}
            </div>
        );
    }
}
