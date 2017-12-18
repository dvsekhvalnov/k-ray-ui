import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { render } from 'react-dom';
import React from 'react';

import App from "./app"
import { history, configureStore } from "./store";

render(
  <Provider store={configureStore()}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>,
  document.getElementById('app'));
