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

// User find by ID

router.get('/:userid',async(req,res)=>{
    try{
        const UserId = req.params.userid; // // Extract the work type from the URL parameter
        if(UserId ){
            const response = await User.find({_id: UserId});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Get all the recoards

router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        console.log("data fetched !!")
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

// Update the Recoard 

router.put('/:id', async (req, res)=>{
    try{
        const userId = req.params.id; // Extract the id from the URL parameter
        const updatedUserData = req.body; // Updated data for the person

        const response = await User.findByIdAndUpdate(userId, updatedUserData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Delete the Recoard

router.delete('/:id', async (req, res) => {
    try{
        const userId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await User.findByIdAndDelete(userId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
module.exports=router;