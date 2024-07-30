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


const equipmentSchema = new mongoose.Schema (
    {
        category: {
            type: String,
            required: true,
            enum: ['ThermoCycler', 'Sequencer', 'Centrifuge', 'Incubator', 'Microscope', 'Cell counters', 'Fume hood', 'Lab Fridges'] 
        },
        
        brand: {
            type: String,
            required: true,
        },
    
        location: {
            type: String,
            required: true,
            enum: ['L808-1', 'L808-2', 'L809-1', 'LS-401', 'LS-402']

        },
        maintenanceDate: {
            type: Date,
            required: true,
        },
        author:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comments: [commentSchema]
    
    },
    {timestamps: true}
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment; 