const mongoose = require('mongoose');

// Membuat schema untuk Project
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Menyimpan Id Task dengan Array
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }]
});

// Membuat model Project dari schema Project
const Project = mongoose.model('Project', projectSchema);

module.exports = { 
    Project 
};
