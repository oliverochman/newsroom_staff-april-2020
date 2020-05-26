import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './css/index.css';
import { StripeProvider } from "react-stripe-elements";


axios.defaults.baseURL = "http://localhost:3000/api"

ReactDOM.render(
  <React.StrictMode>
    <StripeProvider apiKey="">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StripeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
