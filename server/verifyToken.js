const jwt = require('jsonwebtoken');
const config = require('./config');
// VERFYING TOKEN
exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token){
        res.json({
            message:`No token found`
        })
    }
    else{
        jwt.verify(token, config.secret, (err,decoded) => {
            if (err){
                res.json({
                    auth:false,
                    message:`Token validation error`
                })
            }
            else{
               req.userId = decoded.id
               next();
            }
        })
    }
}
module.exports = verifyToken;