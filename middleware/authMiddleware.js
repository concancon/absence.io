const jwt = require('jsonwebtoken');
const User = require("../models/User")
require("dotenv").config()

const authenticateJWT =  (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
      
        jwt.verify(token,process.env.SECRET , async (err, decodedToken) => {
            if (err) {
              res.locals.user = null
              return res.sendStatus(403);
            }
            let user = await User.findById(decodedToken.userId);
            res.locals.user = user;
            next();
        });
    } else {
       res.locals.user = null
        res.sendStatus(401);
    }
   }



  module.exports = {authenticateJWT}