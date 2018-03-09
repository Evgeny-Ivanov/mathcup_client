import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import configure from './configure';
import registerServiceWorker from './registerServiceWorker';

import userStore from './stores/userStore';
import commonStore from './stores/commonStore';
import signUpStore from './stores/signUpStore';
import signInStore from './stores/signInStore';
import newsStore from './stores/newsStore';
import createRoundStore from './stores/rounds/createRoundStore';

const stores = {
  userStore,
  commonStore,
  signInStore,
  signUpStore,
  newsStore,
  createRoundStore,
};

configure();

ReactDOM.hydrate(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
