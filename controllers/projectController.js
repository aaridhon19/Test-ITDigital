const { Project } = require('../models/projectModel');

class ProjectController {
    
    // Method untuk membuat Project baru
    static async createProject(req, res) {
        try {
            // Mengambil inputan name dan description dari body
            const { name, description } = req.body;
            // Validasi inputan name
            if(!name) {
                return res.status(400).json({ message: 'Name Project is required' });
            }

            // Membuat Project baru
            const newProject = await Project.create({ name, description });

            // Menampilkan pesan sukses dan data Project yang baru dibuat
            res.status(201).json( {message: 'Project created successfully', Project : newProject } );
        } catch (error) {
            // Menampilkan pesan error 
            res.status(500).json({ error: error.message });
            console.error(error.message);
        }
    }

    // Method untuk melihat seluruh Project
    static async readProjects(req, res) {
        try {
            // Menampilkan seluruh Project yang ada
            const projects = await Project.find().populate('tasks');

            // Menampilkan data Project
            res.status(200).json(projects);
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk melihat Project sesuai dengan Id Project
    static async readProjectById(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { id } = req.params;
            // Validasi Id Project
            if(!id) {
                return res.status(400).json({ message: 'Id Project is required' });
            }
            // Menampilkan Project sesuai dengan Id Project
            const projects = await Project.findById(id).populate('tasks');
            // Validasi Project sesuai dengan Id Project
            if (!projects) {
                return res.status(404).json({ message: `Project id ${id} was not found` });
            }
            // Menampilkan data Project sesuai dengan Id Project dan pesan sukses
            res.status(200).json({message: `Project id ${id}`,Project : projects});
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk mengupdate Project sesuai dengan Id Project
    static async updateProject(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { id } = req.params;
            // Validasi Id Project
            if(!id) {
                return res.status(400).json({ message: 'Id Project is required' });
            }
            // Mengambil inputan name dan description dari body
            const { name, description } = req.body;
            // Validasi inputan name
            if(!name) {
                return res.status(400).json({ message: 'Name Project is required' });
            }
            // Mengupdate Project sesuai dengan Id Project
            const projects = await Project.findByIdAndUpdate(id);
            // Validasi Project sesuai dengan Id Project
            if (!projects) {
                return res.status(404).json({ message: `Project id ${id} was not found` });
            }
            // Menyimpan data Project yang sudah diupdate
            projects.name = name;
            projects.description = description;
            await projects.save();
            // Menampilkan pesan sukses dan data Project yang sudah diupdate
            res.status(200).json({ message: `Project id ${id} successfully updated`, project : projects });
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }

    // Method untuk menghapus Project sesuai dengan Id Project
    static async deleteProject(req, res) {
        try {
            // Mengambil Id Project dari parameter
            const { id } = req.params;
            // Validasi Id Project
            if(!id) {
                return res.status(400).json({ message: 'Id Project is required' });
            }
            // Menghapus Project sesuai dengan Id Project
            const projects = await Project.findByIdAndDelete(id);
            // Validasi Project sesuai dengan Id Project
            if (!projects) {
                return res.status(404).json({ message: `Project with id ${id} was not found` });
            }
            // Menampilkan pesan sukses dan data Project yang sudah dihapus
            res.status(200).json({Project: projects, message: `Project id ${id} success deleted` });
        } catch (error) {
            // Menampilkan pesan error
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }
}

module.exports = {
    ProjectController
};