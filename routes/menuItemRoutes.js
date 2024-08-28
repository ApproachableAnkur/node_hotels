const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem')


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const savedMenu = await newMenu.save()
        console.log("data saved !!")
        res.status(200).json(savedMenu);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

// fetch aal the menu
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data fetched !!")
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/:tasteTyp',async(req,res)=>{
    try{
        const tasteType = req.params.tasteTyp; // // Extract the work type from the URL parameter
        if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet' ){
            const response = await MenuItem.find({taste: tasteType});
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
module.exports=router;