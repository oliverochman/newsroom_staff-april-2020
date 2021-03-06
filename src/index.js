import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "semantic-ui-css/semantic.min.css";
import axios from 'axios'
import './css/index.css';

axios.defaults.baseURL = "http://localhost:3000/api"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
