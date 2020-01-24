import {create} from "domain";
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: "12e21easfu6la",
        cookie: { secure: false }
    }
));
app.set('view engine', 'pug');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.static(__dirname));
var db = new sqlite3.Database('baza.db', (err) =>{
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to database');
});
app.get('/', function(req, res){
    res.render('EkranPoczatkowy' , { root : __dirname});
});
app.get('/main', function (req, res){
    console.log(req.session.username);
   // res.render('EkranPoczatkowy', {pseudonim: `${req.session.username}`});
    res.render('main' , {pseudonim: `${req.session.username}`});
});
app.get('/json/:nazwa', function (req, res) {
    console.log(req.session.username);
    db.get('SELECT username from users WHERE username = ?', req.session.username, (err, row) => {
        if (req.session.username == row.username) {
            console.log('ok, user in database');
        }
        else
            req.session.username = null;
        return 404;
    });
    if (req.session.username != null) {
        db.each(`SELECT value from json WHERE name ='${req.params.nazwa}'`, (err, row) => {
            if (err) {
                console.log(err);
                res.send("");
            }
            console.log('printing shit');
            res.send(row.value);
        });
    }
});

app.get('/starts', function(req, res){
    console.log('ok');

    res.send(req.body);
});

app.listen(port, function(){
    console.log("Czekamy");
});
function create_database() {
    db.serialize(() => {
    db.run('DROP TABLE IF EXISTS json')
        .run('DROP TABLE IF EXISTS users')
        .run(`CREATE TABLE json(
            name TEXT NOT NULL PRIMARY KEY,
            value BLOB NOT NULL)`)
        .run(`CREATE TABLE users(
            username TEXT NOT NULL PRIMARY KEY,
            password TEXT NOT NULL)`)
    });
    console.log('db created');
}
app.post('/newuser', function(req, res){
    console.log("new user created");
    let name = req.body.username;
    console.log(req.body.username);
    console.log(req.body.password);
    db.run(`INSERT INTO users VALUES(?, ?)`, req.body.username, req.body.password);
    return res.send(req.body);
});
app.post('/login', function(req, res){
   db.get(`SELECT username FROM users WHERE username=? AND password = ?`, [req.body.username, req.body.password], (err, row)=>{
       if(err){
           console.log(err);
       }
       else{
           console.log(row.username);
           console.log('found!');
           req.session.username = row.username;
           console.log(req.session.username);
           console.log('user logged');
           res.render('EkranPoczatkowy', {pseudonim: `${row.username}`});
       }
   });
});
db.serialize(() => {
    db.each('SELECT value FROM json', (err, row) =>{
            if(err){
                console.log(err);
            }
            console.log(row.value);
    });
    db.each('SELECT password from users', (err, row)=>{
        console.log(row.password);
    })
});