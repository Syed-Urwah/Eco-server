const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{

    try {
        const accessToken = req.header('accessToken');
    if(!accessToken){
        res.status(400).send("Your not Login");
        return
    }

    const verifiedUser = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = verifiedUser;

    next();
    } catch (error) {
        res.status(500).json(error)
    }

    
}

module.exports = {verifyToken}