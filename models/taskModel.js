const mongoose = require('mongoose');

// Membuat schema untuk Task
const taskSchema = new mongoose.Schema({
    // Menyimpan Id Proyek
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Membuat model Task dari schema Task
const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
};

