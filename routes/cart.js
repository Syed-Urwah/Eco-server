const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middle-ware/verifyToken');
const Cart = require('../models/Cart');


//Create Cart 
router.post('/create', verifyToken, async (req, res) => {

    try {
        const newCart = new Cart(req.body);
        await newCart.save();

        res.status(200).json(newCart)
    } catch (error) {
        res.status(500).json(error);
    }


});

//Update Cart
router.put('/update/:id', verifyToken , async (req,res)=>{

    try {

        const userCart = await Cart.findById(req.params.id);

        if(req.user.id != userCart.userId && !req.user.isAdmin){
            res.status(400).send("Your not allowed to update other users cart");
            return;
        }

        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
    
    

})

//Delete Cart
router.delete('/delete/:id', verifyToken , async (req,res)=>{
    try {
        const userCart = await Cart.findById(req.params.id);

        if(userCart.userId != req.user.id && !req.user.isAdmin){
            res.status(400).send("Your not allowed to delete other carts");
            return;
        }
        
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCart)
    } catch (error) {
        res.status(500).json(error);
    }
    
})


module.exports = router