const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl');

// Routes GET
//router.get('/user/logout', AuthCtrl.logout);
// Routes POST
router.post('/login', AuthCtrl.login);
router.post('/register', AuthCtrl.register);


module.exports = router;