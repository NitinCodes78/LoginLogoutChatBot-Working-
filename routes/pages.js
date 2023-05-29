const express = require("express");
const loggedIn=require("../controllers/loggedIn");
const logout=require("../controllers/logout");
const router = express.Router();

//At Index Page, It will check for loggedIn
router.get("/", loggedIn, (req, res) => { //In loggedIn, we have written the code that if user is loggedIn, req.user=result[0];
    if(req.user){
        res.render('index', {status:"loggedIn", user: req.user}); //We can write status anything, it's just random string we can write like "meowww", this status we have used in index.hbs
    }else{
        res.render('index', {status: "no", user: "nothing"});
    }
})
router.get("/cart", loggedIn, (req, res) => { //In loggedIn, we have written the code that if user is loggedIn, req.user=result[0];
    if(req.user){
        res.render('cart', {status:"loggedIn", user: req.user}); //We can write status anything, it's just random string we can write like "meowww", this status we have used in index.hbs
    }else{
        res.render('cart', {status: "no", user: "nothing"});
    }
})
router.get("/products", loggedIn, (req, res) => { //In loggedIn, we have written the code that if user is loggedIn, req.user=result[0];
    if(req.user){
        res.render('products', {status:"loggedIn", user: req.user}); //We can write status anything, it's just random string we can write like "meowww", this status we have used in index.hbs
    }else{
        res.render('products', {status: "no", user: "nothing"});
    }
})
router.get("/wishlist", loggedIn, (req, res) => { //In loggedIn, we have written the code that if user is loggedIn, req.user=result[0];
    if(req.user){
        res.render('wishlist', {status:"loggedIn", user: req.user}); //We can write status anything, it's just random string we can write like "meowww", this status we have used in index.hbs
    }else{
        res.render('wishlist', {status: "no", user: "nothing"});
    }
})

router.get("/login", (req,res)=>{
     res.render('login', {message:""});
})
router.get("/register", (req,res) =>{
     res.render('register', {message:""});
})
router.get("/logout",logout);
module.exports = router;