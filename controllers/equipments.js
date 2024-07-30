const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Equipment = require('../models/equipment.js');
const router = express.Router();

// ========= Protected Routes =========

router.use(verifyToken);

router.post('/', async (req, res) => {
    try { 
     req.body.author = req.user._id;
     const equipment = await Equipment.create(req.body);
     equipment._doc.author = req.user;
     res.status(201).json(equipment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
    try { 
        const equipments = await Equipment.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
        res.status(200).json(equipments);

    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:equipmentId', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.equipmentId).populate([
            'author',
            'comments.author',
        ]);
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:equipmentId', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.equipmentId)

        if (!equipment.author.equals(req.user._id)) {
            return res.status(403).send("You do not have access");
        }
        //Update Equipment
        const updatedEquipment = await Equipment.findByIdAndUpdate(
            req.params.equipmentId,
            req.body,
            { new: true });
    
            //append req.user to the author property
            updatedEquipment._doc.author = req.user;

            //Issue Json response:
            res.status(200).json(updatedEquipment);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:equipmentId', async (req, res) => {
    try{
        const equipment = await Equipment.findById(req.params.equipmentId);

        if (!equipment.author.equals(req.user._id)) {
            return res.status(403).send("Not allowed to do that");
        }
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.equipmentId);
    res.status(200).json(deletedEquipment);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;
