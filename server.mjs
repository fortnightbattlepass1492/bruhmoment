import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// ✅ Setup Multer for Image Uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// ✅ Connect to MongoDB
// For production, use environment variables for credentials
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://gnfunited:Jaimeisfat123@cluster0.73wl4.mongodb.net/';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


// ✅ Define the Car Schema with New Details
const CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    mileage: Number,
    price: Number,
    summary: String,
    description: String,
    transmission: String,
    fuel_type: String,
    condition: String,
    vin: String,
    engine_size: String,
    drivetrain: String,
    image: String // Stores image filename
}, { collection: 'inventory_cars' });

const Car = mongoose.model('Car', CarSchema);

// 🚀 API Routes
// ✅ Get All Cars
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: '❌ Error fetching cars.' });
    }
});

// ✅ Add a New Car with Image Upload
app.post('/api/cars', upload.single('image'), async (req, res) => {
    try {
        const { make, model, year, mileage, price, summary, description, transmission, fuel_type, condition, vin, engine_size, drivetrain } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // ✅ Correctly save image

        if (!make || !model || !year || !mileage || !price) {
            return res.status(400).json({ error: 'Make, model, year, mileage, and price are required.' });
        }

        const car = new Car({
            make, model, year, mileage, price,
            summary, description, transmission,
            fuel_type, condition, vin, engine_size, drivetrain,
            image // ✅ Image now correctly saved in MongoDB
        });

        await car.save();
        res.status(201).json({ message: '✅ Car added successfully!', car });
    } catch (error) {
        res.status(500).json({ error: '❌ Error adding the car.' });
    }
});


// ✅ Delete a Car by ID
app.delete('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ error: '❌ Car not found.' });
        }
        res.json({ message: '✅ Car deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: '❌ Error deleting car.' });
    }
});

// 🚀 Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
