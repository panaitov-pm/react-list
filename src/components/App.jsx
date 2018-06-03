import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Navigation from './layout/Navigation';
import Articles from './pages/Articles';
import Login from './pages/Login';

const App = () => (
  <div>
    <Navigation />
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
    <Route path="/articles" component={Articles} />
  </div>
);


export default App;
