const express = require('express');
const { verifyToken } = require('../middle-ware/verifyToken');
const Product = require('../models/Product');
const router = express.Router();

//add product
router.post('/add', verifyToken , async (req,res)=>{
    if(!req.user.isAdmin){
        res.status(400).send("only admin can add product");
        return
    }

    try {

        const {title, description, img, categories, size, color, price} = req.body;

        const newProduct = new Product({
            title,
            description,
            img,
            categories,
            size,
            color,
            price
        })
    
        await newProduct.save();
    
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//update product
router.put('/update/:id', verifyToken, async (req,res)=>{
    if(!req.user.isAdmin){
        res.status(400).send("Your not allowed to update the product");
        return
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{
            new: true
        });
    
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }

    
})

//delete product
router.delete('/delete/:id', verifyToken, async (req,res)=>{
    if(!req.user.isAdmin){
        res.status(400).send("Your not allowed to delete a product");
        return;
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    }

    
})

module.exports = router