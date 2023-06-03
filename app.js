const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dontenv = require("dotenv");
/********************************Run the mongod command***************************/
dontenv.config({ path: './.env'});

const app = express();
const dbConnection = require("./utility/db.js");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
const routes = require("./routes");

app.use(express.static(__dirname + '/views')); //To use external css and js files
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const cookie=require("cookie-parser");
const { loggedIn } = require("./controllers/loggedIn");
app.use(cookie());
app.use(express.json()); 
app.set('view engine', 'ejs');
db.connect((error) => {
    if(error){
        console.log(error);
    }
    console.log("MYSQL Connected...");

})
app.use(express.json());
app.use("/api", routes); 
app.set("views", "./views");
//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/signIn',require('./routes/signIn'));
app.listen(5050,() => {
    console.log("Server started at 5050");
})