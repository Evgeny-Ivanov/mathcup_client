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

const stores = {
  userStore,
  commonStore,
  signInStore,
  signUpStore,
  newsStore,
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
