// ------ Requires ------
const ProductModel = require("../models/productsModel");

// ------ Middelwares ------

module.exports = {
  // Routes GET
  productAllInfo: (req, res) => {
    ProductModel.find()
      .then((products) => {
        res.status(200).json({
          products: products,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  },
  // Routes POST
  productCreate: (req, res) => {
    try{
        const productObject = req.body;
        const product = new ProductModel({
            //userId: req.userId,
            ...productObject
        });
        product.save()
        .then(() => {
            res.status(201).json({
                message: 'Product created!',
            });
        })
        .catch((error) => {
            console.log("Error in try ");
            res.status(400).json({
                error: error,
            });
        });
    }catch(error){
        console.log("Error in catch ");
        res.status(400).json({
            error: error,
        });
    }
  },
  // Routes PUT
  productUpdate: (req, res) => {
    ProductModel.findOne({ _id : req.params.id })
    .then((product) => {
        /* if (product.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                message: 'Unauthorized request!',
            });
        }else{
            ProductModel.updateOne({ _id: req.params.id}, { ...req.body })
            .then(() => {
                res.status(200).json({
                    message: 'Product updated!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
        } */
        ProductModel.updateOne({ _id: req.params.id}, { ...req.body })
            .then(() => {
                res.status(200).json({
                    message: 'Product updated!',
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
  },
  // Routes DELETE
  productDelete: (req, res) => {
    ProductModel.findOne({ _id : req.params.id })
    .then((product) => {
        /* if (product.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                message: 'Unauthorized request!'
            });
        }else{
            ProductModel.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'Product deleted!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
        } */
        ProductModel.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'Product deleted!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    })
    .catch((error) => {
        console.log("Error in catch : ", error);
        res.status(500).json({
            error: error,
        });
    });
  },
};
