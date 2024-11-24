const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.userId = userId;
    if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
    } else {
        next();
    }
}

module.exports = {
    generateAccessToken: (user) => {
        let token = jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
        return token;
    },
    authToken: (req, res, next) => {
       try{
        authenticateToken(req, res, next);
       }catch{
              res.status(401).json({
                error: 'Unauthorized request!',
              });
       }
    },
};