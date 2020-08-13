
const Config = require('./config/config');
const db = require('./models/db');
const usrRoute = require('./route/index.router');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');


const cors = require("cors")


const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.use(bodyParser.json());
app.use(cors());
app.use('/api', usrRoute);

app.get('/', function (req, res) {
    router.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(Key => valErrors.push(err.errors[Key].message));
        res.status(422).send(valErrors)
    }
});


app.listen(3000, () => console.log('Server started...'));

