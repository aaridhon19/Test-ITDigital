const mongoose = require('mongoose');

// Fungsi untuk mengubungkan ke database MongoDB
const connectDB = async () => {
  try {
    // Menggunakan mongoose untuk menghubungkan ke database MongoDB
    await mongoose.connect(process.env.DATABASE_URL ||'mongodb://localhost:27017/test-dev-ITDigital');
    // Jika berhasil terhubung
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Jika gagal terhubung ke database dengan status kode 1 yang menunjukkan kesalahan
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
