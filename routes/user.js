const express = require('express');
const { verifyToken } = require('../middle-ware/verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');



//Update User
router.put('/update/:id', verifyToken , async (req,res)=>{

    const loginUser = req.user

    try {
        if(loginUser.isAdmin || ( loginUser.id == req.params.id) ){

            if(req.body.password){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            }
    
            
            
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body   
            }, {new: true})
    
            res.status(200).json(updatedUser);
        }else{
            res.status(400).json("Your not allowed to update Another user")
        }
    } catch (error) {
        res.status(500).json(error);
    }

    

})

module.exports = router