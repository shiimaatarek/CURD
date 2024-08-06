import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './components/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
    <App />
    </Provider>
  </>
);

reportWebVitals();