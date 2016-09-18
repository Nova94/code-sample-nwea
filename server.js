import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import {Deck} from './models/Deck';
import SuitedDeck from '../assets/suited.json';

const app = express();

app.use('/bundle.js', express.static(__dirname + '/bundle.js')); //set static to include bundle.js

app.use(morgan('dev')); //set morgan logger to dev
app.set('view engine', 'jade'); //set view engine to jade
app.set('views', __dirname + '/views/'); //set views directory

const sendDeck = (req, res) => {
    let deck = new Deck();
    if(req.params.type == 'suited') {
        deck.fromJSON(SuitedDeck);
    }

    if(req.params.shuffled == 'shuffled'){
        deck.shuffle()
    }
    // Disable caching for content files
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.send(deck.toJSON());
};

app.get('/deck/:type/:shuffled', sendDeck);
app.get('/deck/:type/', sendDeck);
app.get('/', (req, res) => {
    res.render('index', {title: 'code-sample-nwea'}); //render index.jade template
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});

export default app;