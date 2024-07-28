const express = require('express');
const verifyToken = require('../middleware/verify-token.js')
const Reagent = require('../models/reagent.js')
const router = express.Router();

//====PUBLIC ROUTES ======



//======PROTECTED ROUTES ========
router.post('/', async (req, res) => {
    try {
        // req.body.author = req.user._id;
        const reagent = await Reagent.create(req.body);
        // reagent._doc.author = req.user;
        res.status(201).json(reagent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) =>{
    try {
        const reagents = await Reagent.find({})
        .populate('author')
        .sort({ createdAt: 'desc' })
        res.status(200).json(reagents);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:reagentId', async (req, res) => {
    try { 
        const reagent = await Reagent.findById(req.params.reagentId).populate('author');
        res.status(200).json(reagent);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.use(verifyToken);
module.exports = router;


