let dataBasePass;

// ------ Requires ------
const bcrypt = require('bcrypt');
const UserModel = require('../models/usersModel');
const token = require('../middelwares/token');

// ------ Middelwares ------

module.exports = {
   
    logout: (req, res, next) => {},
    // Routes POST
    login: (req, res) => {
        UserModel.findOne({ email: req.body.email})
        .then(async (user) => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found!',
                });
            }else{
                dataBasePass = user.password;
                const match = await bcrypt.compare(req.body.password, dataBasePass);
                if(!match){
                    return res.status(401).json({
                        message: 'Password not match!',
                    });
            }else{
                const accessToken = token.generateAccessToken(user);
                res.cookie('token', accessToken, { httpOnly: true, maxAge: 6 * 60 * 60 * 1000, path: '/', sameSite: 'Lax' });
                const userObject = {
                    token: accessToken,
                    userId: user._id,
                }
                console.log(userObject);
                return res.status(200).json({
                    token: accessToken,
                    userId: user._id,
                });
            }}
        })
    },
    register: (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = new UserModel({
                    email: req.body.email,
                    password: hash,
                });
                user.save()
                    .then(() => {
                        res.status(201).json({
                            message: 'User created!',
                        });
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: error,
                        });
                    });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error,
                });
            });
    }
};
