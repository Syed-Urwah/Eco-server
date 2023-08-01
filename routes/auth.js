const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')

//Register
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = await req.body;

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(200).send("user already exist");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                username,
                email,
                password: hash
            })

            const user = await newUser.save();
            res.status(200).json(user)
        }


    } catch (error) {
        res.status(500).json(error);
    }


})

router.get('/test', (req, res) => {
    res.status(200).json("sfsdf")
})



module.exports = router