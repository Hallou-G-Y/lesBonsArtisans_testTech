const express = require('express');
const router = express.Router();

const ProductCtrl = require('../controllers/productsCtrl');
const {authToken} = require('../middelwares/token');

//Routes GET
router.get('/all', ProductCtrl.productAllInfo);

//Routes POST
router.post('/create', /* authToken, */ ProductCtrl.productCreate);

//Routes PUT
router.put('/update/:id',/*  authToken, */ ProductCtrl.productUpdate);

//Routes DELETE
router.delete('/delete/:id',/*  authToken, */ ProductCtrl.productDelete);

module.exports = router;

