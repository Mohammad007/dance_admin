import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
// import * as serviceWorker from './serviceWorker';
import { store } from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>

, document.getElementById('root'));

// serviceWorker.unregister();