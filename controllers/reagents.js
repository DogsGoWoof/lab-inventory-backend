const express = require('express');
const verifyToken = require('../middleware/verify-token.js')
const Reagent = require('../models/reagent.js')
const router = express.Router();


//======PROTECTED ROUTES ========
router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const reagent = await Reagent.create(req.body);
        reagent._doc.author = req.user;
        res.status(201).json(reagent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
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
        const reagent = await Reagent.findById(req.params.reagentId).populate([
            'author',
            'comments.author',
        ]);

        res.status(200).json(reagent);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:reagentId', async (req, res) => {
    try {
        // Find the reagent:
        const reagent = await Reagent.findById(req.params.reagentId);

        if (!equipment) {
            return res.status(404).send("Equipment not found");
        }

  
      // Check permissions:
        if (!reagent.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        // Update reagent:
        const updatedReagent = await Reagent.findByIdAndUpdate(
            req.params.reagentId,
            req.body,
            { new: true }
        );

        // Append req.user to the author property:
        updatedReagent._doc.author = req.user;

        // Issue JSON response:
        res.status(200).json(updatedReagent);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:reagentId', async (req, res) => {
    try {
        const reagent = await Reagent.findById(req.params.reagentId);

        if (!reagent.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedReagent = await Reagent.findByIdAndDelete(req.params.reagentId);
        res.status(200).json(deletedReagent);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/:reagentId/comments', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const reagent = await Reagent.findById(req.params.reagentId);
        reagent.comments.push(req.body);
        await reagent.save();

        //Find the newly created comment:
        const newComment = reagent.comments[reagent.comments.length - 1];
        newComment._doc.author = req.user;

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:reagentId/comments/:commentId', async (req, res) => {
    try {
        const reagent = await Reagent.findById(req.params.reagentId);
        const comment = reagent.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await reagent.save();
        res.status(200).json( { message: 'OK' });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:reagentId/comments/:commentId', async (req, res) => {
    try {
        const reagent = await Reagent.findById(req.params.reagentId);
        reagent.comments.remove({ _id: req.params.commentId });
        await reagent.save();
        res.status(200).json({ message: 'Ok'});
    } catch (err) {
        res.status(500).json(err);

    }
})

module.exports = router;