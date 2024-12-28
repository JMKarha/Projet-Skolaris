import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Connexion from './composants/Connexion';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Connexion} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
