const { Project } = require('../models/projectModel');
const { Task } = require('../models/taskModel');

class TaskController {

    // Method untuk membuat Tugas baru di dalam Proyek sesuai dengan Id Proyek
    static async createTask(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { projectId } = req.params;
            // Validasi Id Project
            if(!projectId) {
                return res.status(400).json({ message: 'Project Id is required' });
            }
            // Mengambil inputan title, description, startTime, dan endTime dari body
            const { title, description, startTime, endTime } = req.body;

            // Validasi inputan title, startTime, dan endTime
            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }
            if (!startTime) {
                return res.status(400).json({ message: 'Start time is required' });
            }
            if (!endTime) {
                return res.status(400).json({ message: 'End time is required' });
            }
            // Mengonversi startTime dan endTime menjadi tipe data Date
            const startTimeDate = new Date(startTime);
            const endTimeDate = new Date(endTime);
            // Validasi startTime lebih awal dari endTime
            if (startTimeDate >= endTimeDate) {
                return res.status(400).json({ message: 'End time must be greater than Start time' });
            }
            // Melihat apakah ada Tugas yang tumpang tindih dengan waktu yang sama
            const overlappingTasks = await Task.find({
                projectId,
                $or: [
                    { startTime: { $lt: endTimeDate }, endTime: { $gt: startTimeDate } }
                ]
            });
            // Validasi Tugas tidak boleh tumpang tindih
            if (overlappingTasks.length > 0) {
                return res.status(400).json({ message: 'Tasks cannot overlap in time' });
            }
            // Membuat Tugas baru
            const newTask = await Task.create({ projectId, title, description, startTime, endTime });
            // Menambahkan Id Tugas ke dalam Array tasks di Project
            await Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });
            // Menampilkan pesan sukses dan data Tugas yang baru dibuat
            res.status(201).json({ message: `Task at Project id ${projectId} created successfully`, Task : newTask });
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk melihat seluruh Tugas di dalam Proyek sesuai dengan Id Proyek
    static async readTasks(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { projectId } = req.params;
            // Validasi Id Project
            if(!projectId) {
                return res.status(400).json({ message: 'Project Id is required' });
            }
            // Menampilkan seluruh Tugas di dalam Proyek sesuai dengan Id Project, termasuk populasi tugas
            const tasks = await Project.findById(projectId).populate('tasks');
            // Validasi Tugas di dalam Proyek sesuai dengan Id Project
            if (!tasks) {
                return res.status(404).json({ message: `Task at Project Id number ${projectId} was not found` });
            }
            // Menampilkan pesan sukses dan data Tugas di dalam Proyek sesuai dengan Id Project
            res.status(200).json({ message: `Task at Project Id ${projectId} `, Task: tasks });
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk melihat seluruh Tugas yang sudah selesai di dalam Proyek sesuai dengan Id Proyek
    static async readCompletedTask(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { projectId } = req.params;
            // Validasi Id Project
            if(!projectId) {
                return res.status(400).json({ message: 'Project Id is required' });
            }
            // Menampilkan seluruh Tugas yang sudah selesai di dalam Proyek sesuai dengan Id Project
            const tasks = await Task.find({ projectId, completed: true });
            // Validasi Tugas yang sudah selesai di dalam Proyek sesuai dengan Id Project
            if(tasks.length === 0) {
                return res.status(404).json({ message: `No completed tasks found at Project id ${projectId}` });
            }
            // Menampilkan pesan sukses dan data Tugas yang sudah selesai di dalam Proyek sesuai dengan Id Project
            res.status(200).json({message: `Tasks at Project Id ${projectId}`, Task: tasks});
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk melihat seluruh Tugas yang belum selesai di dalam Proyek sesuai dengan Id Proyek
    static async readUncompletedTask(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { projectId } = req.params;
            // Validasi Id Project
            if(!projectId) {
                return res.status(400).json({ message: 'Project Id is required' });
            }
            // Menampilkan seluruh Tugas yang belum selesai di dalam Proyek sesuai dengan Id Project
            const tasks = await Task.find({ projectId, completed: false });
            // Validasi Tugas yang belum selesai di dalam Proyek sesuai dengan Id Project
            if(tasks.length === 0) {
                return res.status(404).json({ message: `No uncompleted tasks found at Project id ${projectId}` });
            }
            // Menampilkan pesan sukses dan data Tugas yang belum selesai di dalam Proyek sesuai dengan Id Project
            res.status(200).json({message: `Tasks at Project Id ${projectId}`, Task : tasks});
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk mengupdate Tugas sesuai dengan Id Tugas
    static async updateTask(req, res) {
        try {
            // Mengambil Id Tugas dari parameter
            const { id } = req.params;
            // Validasi Id Tugas
            if(!id) {
                return res.status(400).json({ message: 'Task Id is required' });
            }
            // Mengambil inputan title, description, startTime, dan endTime dari body
            const { title, description, startTime, endTime } = req.body;
            // Validasi inputan title, startTime, dan endTime
            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }
            if (!startTime) {
                return res.status(400).json({ message: 'Start time is required' });
            }
            if (!endTime) {
                return res.status(400).json({ message: 'End time is required' });
            }
            // Menampilkan Tugas sesuai dengan Id Tugas
            const tasks = await Task.findByIdAndUpdate(id);
            // Validasi Tugas sesuai dengan Id Tugas
            if (!tasks) {
                return res.status(404).json({ message: `Task id number ${id} was not found` });
            }
            // Mengonversi startTime dan endTime menjadi tipe data Date
            const startTimeDate = new Date(startTime);
            const endTimeDate = new Date(endTime);

            // Validasi startTime lebih awal dari endTime
            if (startTimeDate >= endTimeDate) {
                return res.status(400).json({ message: 'End time must be greater than start time' });
            }
            // Menyimpan data Tugas yang sudah diupdate
            tasks.title = title;
            tasks.description = description;
            tasks.startTime = startTime;
            tasks.endTime = endTime;
            await tasks.save();
            // Menampilkan pesan sukses dan data Tugas yang sudah diupdate
            res.status(200).json({message: `Task id ${id} success updated`,Task : tasks});
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk mengupdate status Tugas menjadi selesai sesuai dengan Id Tugas
    static async updateTaskCompleted(req, res) {
        try {
            // Mengambil Id Tugas dari parameter
            const { id } = req.params;
            // Validasi Id Tugas
            if(!id) {
                return res.status(400).json({ message: 'Task Id is required' });
            }
            // Menampilkan Tugas sesuai dengan Id Tugas
            const tasks = await Task.findByIdAndUpdate(id);
            // Validasi Tugas sesuai dengan Id Tugas
            if (!tasks) {
                return res.status(404).json({ message: 'Task not found' });
            }
            // Menyimpan status Tugas yang sudah selesai dan menyimpan data Tugas yang sudah diupdate
            tasks.completed = !tasks.completed;
            await tasks.save();

            // Menampilkan pesan sukses dan data Tugas yang sudah diupdate
            res.status(200).json({message: `Task id ${id} success completed`, Task:tasks});
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk menghapus Tugas sesuai dengan Id Tugas
    static async deleteTask(req, res) {
        try {
            // Mengambil Id Tugas dari parameter
            const { id } = req.params;
            // Validasi Id Tugas
            if(!id) {
                return res.status(400).json({ message: 'Task Id is required' });
            }
            // Menghapus Tugas sesuai dengan Id Tugas
            const tasks = await Task.findByIdAndDelete(id);
            // Validasi Tugas sesuai dengan Id Tugas
            if (!tasks) {
                return res.status(404).json({ message: `Task id number ${id} was not found` });
            }
            // Menampilkan pesan sukses
            res.status(200).json({ message: `Task id ${id} deleted successfully` });
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }
}

module.exports = {
    TaskController
};

