const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./server/routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Skolaris API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
