const mongoose = require('mongoose');


const equipmentSchema = new mongoose.Schema (
    {
        category: {
            type: String,
            required: true,
            enum: ['ThermoCycler', 'Sequencer', 'Centrifuge', 'Incubator', 'Microscope'] 
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
        // author: { type: Schema.Types.ObjectId, ref: 'User' }
    
    },
    // {timestamps: true}
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment; 