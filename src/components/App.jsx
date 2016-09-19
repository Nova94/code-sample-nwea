import 'babel-polyfill';
import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import {Game} from './Game';
import {WarCardGamePlayer} from '../models/Player';


class App extends Component {
    render() {
        return (
            <Game source="http://localhost:3000/deck/suited/shuffled" />
        );
    }
}

render(<App />, document.getElementById('app'));
