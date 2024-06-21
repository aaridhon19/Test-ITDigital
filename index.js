const express = require("express");
const { connectDB } = require("./config/connectDb");
const app = express();
const port = process.env.PORT || 4000 ;
const projectRoutes = require("./routers/projectRouters");
const taskRoutes = require("./routers/taskRouters");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Menghubungkan ke database MongoDB
connectDB();

// Menggunakan router dari projectRoutes
app.use('/projects', projectRoutes);

// Menggunakan router dari taskRoutes
app.use('/', taskRoutes);

// Menjalankan server pada port 4000
app.listen(port, () => {
    console.log(`Server running on Port : ${port}`);
});

module.exports = app;

