import React, { useState } from 'react';
import axios from 'axios';

const Connexion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reponse = await axios.post('http://localhost:5000/api/auth/connexion', { email, motDePasse });
      localStorage.setItem('jeton', reponse.data.jeton);
      // Rediriger vers le tableau de bord ou la page d'accueil
      console.log('Connexion réussie');
    } catch (err) {
      setErreur('Identifiants invalides');
    }
  };

  return (
    <div className="conteneur-connexion">
      <h2>Connexion à Skolaris</h2>
      {erreur && <p className="erreur">{erreur}</p>}
      <form onSubmit={gererSoumission}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="motDePasse">Mot de passe :</label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Connexion;
