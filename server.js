import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use('/bundle.js', express.static(__dirname + '/bundle.js')); //set static to include bundle.js

app.use(morgan('dev')); //set morgan logger to dev
app.set('view engine', 'jade'); //set view engine to jade
app.set('views', __dirname + '/views/'); //set views directory

app.get('/', (req, res) => {
    res.render('index', {title: 'code-sample-nwea'}); //render index.jade template
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});

export default app;