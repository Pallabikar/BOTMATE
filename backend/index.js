require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', mediaRoutes);

app.get('/', (req, res) => {
  res.send('BotMate Neural Cloud API is Online! 🦖');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
