const routes = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register

routes.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT).toString(),
        profilePicture: req.body.profilePicture,
        isAdmin: req.body.isAdmin,
        desc: req.body.desc,
        city: req.body.city,
        phone:req.body.phone,
        gender:req.body.gender,
        birthday:req.body.birthday,
        hobbies: req.body.hobbies,
        viewed: [],
    });
    try {
        var saveduser = await newUser.save();
        res.status(200).json(saveduser);
        // console.log(saveduser);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err);
    }


});

//login

routes.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user !== null) {
            const passwd = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT).toString(CryptoJS.enc.Utf8);

            if (passwd === req.body.password) {
                const accessToken = jwt.sign({
                    id:user._id+process.env.SALT_TOKEN,
                    isAdmin:user.isAdmin,
                }, process.env.JWT,
                {expiresIn:"3d"}
                );
                const { password, ...others } = user._doc;
                res.status(200).json({...others,accessToken});
            }
            else {
                res.status(401).json('wrong credentials!');
            }
        }
        else {
            res.status(401).json('wrong credentials!')
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = routes;