const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const config = require('../config/baseDeDonnees');

router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const connexion = await mysql.createConnection(config);
    const [lignes] = await connexion.execute('SELECT * FROM utilisateurs WHERE email = ?', [email]);

    if (lignes.length === 0) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const utilisateur = lignes[0];
    const correspondance = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);

    if (!correspondance) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const charge = {
      utilisateur: {
        id: utilisateur.id,
        role: utilisateur.role
      }
    };

    jwt.sign(
      charge,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, jeton) => {
        if (err) throw err;
        res.json({ jeton });
      }
    );

    await connexion.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
