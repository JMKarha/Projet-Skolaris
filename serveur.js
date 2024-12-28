const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Importer les routes
const routesAuth = require('./serveur/routes/auth');

// Utiliser les routes
app.use('/api/auth', routesAuth);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Skolaris' });
});

app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
