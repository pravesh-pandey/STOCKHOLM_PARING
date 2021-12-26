const { verifyToken, verifytokenauth } = require('./verifyToken');
const routes = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../model/User');
routes.put('/:id', verifytokenauth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT).toString();
    }
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateuser);

    }catch (err) {
        res.status(500).json(err);
    }
});

routes.delete('/:id',verifytokenauth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted...");
    }catch{
        res.status(500).json(err);
    }
});
module.exports = routes;