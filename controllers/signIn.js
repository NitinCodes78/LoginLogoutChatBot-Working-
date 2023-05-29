const mysql = require("mysql");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
exports.login= async (req,res)=>{
    const {email,password} =req.body;
    if(!email || !password){
       return res.render('login',{message:'Please enter your email and Password'});
    }else{
        db.query('SELECT * FROM users WHERE email=?',[email],async(Err, result)=>{
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password, result[0].password)){
                return res.render('login', {message:'Incorrect Password or email'});
            }else{
                const token=jwt.sign({ id: result[0].id }, process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES,
                }) //jwt token here contains id, secret key and expires in
                const cookieOptions={
                    expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly:true
                }
                res.cookie("userRegistered",token,cookieOptions); //userRegistered is the name of cookie
                console.log("Yayyy!, we reached till here");
                res.redirect('/');
            }
        })
     }
}