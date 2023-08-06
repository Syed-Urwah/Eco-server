const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    products:[
        {
            productId:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ],
    amount:{
        type: Number
    },
    address:{
        type: Object
    },
    status:{
        type: String,
        default: "pending"
    }
},{
    timestamps: true
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;