import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

// styles
import 'carbon-components/css/carbon-components.min.css';
import './scss/grid-layout.css';
import './scss/grid-resize.css';
import './scss/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
