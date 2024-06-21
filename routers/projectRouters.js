const express = require('express');
const router = express.Router();
const {ProjectController} = require('../controllers/projectController');

// Route untuk membuat Proyek baru
router.post('/', ProjectController.createProject);

// Route untuk melihat seluruh Proyek
router.get('/', ProjectController.readProjects);

// Route untuk melihat Proyek sesuai dengan Id Proyek
router.get('/:id', ProjectController.readProjectById);

// Route untuk mengupdate Proyek sesuai dengan Id Proyek
router.put('/:id', ProjectController.updateProject);

// Route untuk menghapus Proyek sesuai dengan Id Proyek
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;