import 'babel-polyfill';
import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
    render() {
        return (<h1>Hello World from react!</h1>);
    }
}

render(<App />, document.getElementById('app'));
