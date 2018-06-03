import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Navigation from './layout/Navigation';
import Authors from './pages/Authors/Authors';
import Login from './pages/Login/Login';

const App = () => (
  <div>
    <Navigation />
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
    <Route path="/authors" component={Authors} />
  </div>
);


export default App;
