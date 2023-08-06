const express = require('express');
const { verifyToken } = require('../middle-ware/verifyToken');
const Order = require('../models/Order');
const router = express.Router();

router.post('/create', verifyToken  , async (req,res)=>{

    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json(error);
    }

    
})

router.put('/update/:id', verifyToken , async (req,res)=>{

    try {

        const userOrder = await Order.findById(req.params.id);
        if(userOrder.userId != req.user.id && !req.user.isAdmin){
            res.status(400).send("Your not allowed to update other orders");
            return;
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }

    
})

router.delete('/delete/:id', verifyToken , async (res,req)=>{

    try {

        const userOrder = await Order.findById(req.params.id);

        if(userOrder.userId != req.user.id && !req.user.isAdmin){
            res.status(400).send("you cant delete other users order");
            return;
        }

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json(error);
    }

    
})

//Get User Order
router.get('/:userId', verifyToken , async (req,res)=>{

    if(req.user.id != req.params.id && !req.user.isAdmin){
        res.status(400).send("your not allowed to see other orders");
        return;
    }

    const userOrder = await Order.findOne({userId: req.params.id});

})

module.exports = router