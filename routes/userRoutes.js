const express = require('express')
const router = express.Router();
const User = require('./../models/User')

// Insert the recoard

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const savedUser = await newUser.save()
        console.log("data saved !!")
        res.status(200).json(savedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

module.exports=router;