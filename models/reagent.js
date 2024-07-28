const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true}
);

const reagentSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true, // review if this is enum 
        },
        category: {
            type: String,
            required: true,
            enum: ['Sequencing', 'PCR', 'Illumina', 'Pacbio',] //review this 
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        author:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comments: [commentSchema]
    },
    {timestamps: true}
);

const Reagent = mongoose.model('Reagent', reagentSchema);

module.exports = Reagent; 