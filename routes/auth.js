const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middle-ware/verifyToken');


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

//Register Admin
router.post('/register-admin', verifyToken, async (req, res) => {

    try {
        const isAdmin = await req.user.isAdmin;
        //if login user is not admin
        if (!isAdmin) {
            res.status(200).send("Only admin can create account for admin");
            return
        }

        const user = await User.findOne({ email: req.body.email });

        //if user is already exist
        if (user) {
            res.status(200).send("An account is already created on this email");
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const admin = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: true
        })

        await admin.save();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json(error);
    }


})

//login
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send("User not exist with this email");
            return;
        }

        const password = bcrypt.compareSync(req.body.password, user.password);
        if (!password) {
            res.status(400).send("password incorrect");
            return
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET)

        res.status(200).json({ accessToken, user })
    } catch (error) {
        res.status(500).json(error);
    }



})





module.exports = router