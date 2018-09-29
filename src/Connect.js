import React, {Component} from 'react';
import {auth, db} from "./firebase";
import './App.css';

export default class Connect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            newData: ''
        };
// React Tricks. Without this lines state didn`t render with newData
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

// first version of the method ...
    componentDidMount() {
        db.ref().on('value', (snapshot) => {
            this.setState({
                data: snapshot.val(),
            });
        });
    }

// next version of the method (path defined)
//     componentDidMount() {
//         this.pathName = '/ONE/';
//         this.dataRef = db.ref(this.pathName);
//         this.dataRef.on('child_added', (snapshot) => {
//             this.setState({
//                 data: snapshot.val()
//             });
//         });
//     }
// p.s.
// to make change one time - use ONCE
// -> this.dataRef.once('child_added', (snapshot) => {

    handleChange(event) {
        const newData = event.target.value;
        this.setState({
            newData: newData
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        db.ref().push(this.state.newData);
// p.s.
// to set one record - use SET
// -> db.ref().child("AAAA").set(this.state.newData);
// to add new record each time - use PUSH
// -> db.ref('/AAAA').push(this.state.newData);
    }

    logout() {
        auth.signOut();
    }

    render() {
        return (
            <div className="App">
                <div>
                    <h2 style={{color: 'green'}}>Firebase realtime database</h2>
                    <label style={{color: 'green'}}>Disconnect database </label>
                    <button onClick={this.logout} style={{marginLeft: '10px'}}>Logout</button>
                </div>
                <hr/>
                <div>
                    <h4>At the moment - {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} - Firebase contains the following data:</h4>
                    <hr/>
                    <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                </div>
                <hr/>
                <form>
                    <label style={{marginRight: '10px', color: 'green'}}>Add new data:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.newData}/>
                    <button type="submit" onClick={this.handleSubmit} style={{marginLeft: '10px'}}>Submit</button>
                </form>
            </div>
        );
    }
}
