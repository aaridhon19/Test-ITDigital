const express = require('express');
const router = express.Router();
const {TaskController} = require('../controllers/taskController');

// Route untuk membuat Tugas baru di dalam Proyek sesuai dengan Id Proyek
router.post('/projects/:projectId/tasks', TaskController.createTask);

// Route untuk melihat seluruh Tugas di dalam Proyek sesuai dengan Id Proyek
router.get('/projects/:projectId/tasks', TaskController.readTasks);

// Route untuk melihat seluruh Tugas yang sudah selesai di dalam Proyek sesuai dengan Id Proyek
router.get('/projects/:projectId/tasks/completed', TaskController.readCompletedTask);

// Route untuk melihat seluruh Tugas yang belum selesai di dalam Proyek sesuai dengan Id Proyek
router.get('/projects/:projectId/tasks/uncompleted', TaskController.readUncompletedTask);

// Route untuk mengupdate Tugas sesuai dengan Id Tugas
router.put('/tasks/:id', TaskController.updateTask);

// Route untuk mengupdate status Tugas menjadi selesai sesuai dengan Id Tugas
router.put('/tasks/:id/completed', TaskController.updateTaskCompleted);

// Route untuk menghapus Tugas sesuai dengan Id Tugas
router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;
