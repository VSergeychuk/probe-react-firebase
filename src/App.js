import React, {Component} from 'react';
import {database} from "./firebase";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.dataRef = null;
        this.state = {
            data: null,
            newData: ''
        };
// React Tricks. Without this lines state didn`t render with newData
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

// first version of the method ...
    // componentDidMount() {
    //     console.log('Mounted ...');
    //     database.ref().on('value', (snapshot) => {
    //         console.log('The Data Changed ...', snapshot.val());
    //         this.setState({
    //             data: snapshot.val()
    //         });
    //     });
    // }

    componentDidMount() {
        this.dataRef = database.ref('/ONE/TWO/THREE');
// to make change one time - use ONCE
        // this.dataRef.once('child_added', (snapshot) => {
        this.dataRef.on('child_added', (snapshot) => {
            this.setState({
                data: snapshot.val()
            });
        });
    }

    handleChange(event) {
        const newData = event.target.value;
        this.setState({
            newData: newData
        });
    }

    handleSubmit(event) {
        event.preventDefault();
// to set one record - use SET
        // database.ref().child("AAAA").set(this.state.newData);
// to add new record each time - use PUSH
        // database.ref('/AAAA').push(this.state.newData);
        this.dataRef.push(this.state.newData);
    }

    render() {
        return (
            <div className="App">
                <div className="App--header">
                    <h2 className="App-title">Welcome to React & Firebase</h2>
                </div>
                <pre className="App--date">
                    {JSON.stringify(this.state.data, null, 2)}
                </pre>
                <form className="App--form" onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.newData}/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default App;
