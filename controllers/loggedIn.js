const mysql = require("mysql");
const jwt=require("jsonwebtoken");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
const loggedIn=(req,res, next)=>{
    if(!req.cookies.userRegistered)
       return next();
    try{
        //verify the cookie with the secret key we defined in .env and assigned in signIn page
        const decoded=jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result)=>{
              if(err) return next();
            //   req.user is a convenience property that is an alias for req.session.user
              req.user=result[0]; //database query will return result when we select
              return next();
        })
    }catch(err){
        if(err) return next();//If error, return next we don't care about the error, website should work
    }
}
module.exports=loggedIn;
//When I was doing exports.loggedIn, then there was some problem