const request= require('request');
const express = require('express');
const bodyParser= require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex= require('knex');

const signUp= require('./controllers/signUp');
const signIn = require('./controllers/signIn');
const profile= require('./controllers/profile');
const entries= require('./controllers/entries');
const weather= require('./controllers/weather');

const app= express();
app.use(bodyParser.json());
app.use(cors());

const db= knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '#Oloyede1',
        database: 'myapp'
    }
});

app.get('/', (req, res)=> res.send('App is working'))
app.post('/signup', (req, res)=> {signUp.signUpHandler(req, res, db, bcrypt)})
app.post('/signin', (req, res)=> {signIn.signInHandler(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.profileHandler(req, res, db)})
app.post('/entries', (req, res)=> {entries.entriesHandler(req, res, db)})
app.post('/weather', (req, res)=> {weather.weather(req, res)})

app.listen('5000', ()=> {
    console.log('Port is working at 5000')
})