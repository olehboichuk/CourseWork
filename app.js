const {Client} = require('pg');
const express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;

let UsersController = require('./handlers/UsersController');
let LanguagesControler = require('./handlers/LanguagesControler');
let AuthController = require('./auth/AuthController');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', UsersController);
app.use('/api', AuthController);
app.use('/api', LanguagesControler);

app.listen(port, () => {
    console.log('Server started on port 3000');
});

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

