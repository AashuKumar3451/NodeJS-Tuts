const jwt = require('jsonwebtoken');
require('dotenv').config;

const jwtAuthMiddleware = function (req,res,next){
    if(!req.headers.authorization){
        res.status(401).json("Invalid Token");
    }
    // Extract jwt token given by user
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Unautorized");
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // Attach user information back to request object with a new key in request
        req.userPayload = decoded;
        next();
    } catch (error) {
        console.log("Error");
        res.status(401).json({error: 'Invalid token'});
    }
}

// JWT Token generation
const generateJWT = function (uesrData){
    return jwt.sign(uesrData,process.env.JWT_SECRET,{expiresIn: 3000});
}

module.exports = {jwtAuthMiddleware, generateJWT};