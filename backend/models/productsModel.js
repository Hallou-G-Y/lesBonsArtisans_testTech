const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    warranty_years: { type: Number, required: true, default: 2 },
    available: { type: Boolean, required: true }
})

module.exports = mongoose.model('Product', productSchema)