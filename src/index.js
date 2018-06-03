import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './configureStore/index';
import Root from './components/common/Root';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Root store={store} />
  </BrowserRouter>,
  document.getElementById('root'),
);
