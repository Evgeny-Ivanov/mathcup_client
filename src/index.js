import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import configure from './configure';
import registerServiceWorker from './registerServiceWorker';

import commonStore from './stores/commonStore';
import createNewsStore from './stores/news/createNewsStore';
import createRoundStore from './stores/rounds/createRoundStore';
import createTournamentStore from './stores/tournaments/createTournamentStore';
import newsListStore from './stores/news/newsListStore';
import newsStore from './stores/news/newsStore';
import passRoundStore from './stores/rounds/passRoundStore';
import roundRatingStore from './stores/rounds/roundRatingStore';
import roundResultStore from './stores/rounds/roundResultStore';
import roundStore from './stores/rounds/roundStore';
import signInStore from './stores/signInStore';
import signUpStore from './stores/signUpStore';
import tournamentStore from './stores/tournaments/tournamentStore';
import tournamentsStore from './stores/tournaments/tournamentsStore';
import userStore from './stores/userStore';

const stores = {
  commonStore,
  createNewsStore,
  createRoundStore,
  createTournamentStore,
  newsListStore,
  newsStore,
  passRoundStore,
  roundRatingStore,
  roundResultStore,
  roundStore,
  signInStore,
  signUpStore,
  tournamentStore,
  tournamentsStore,
  userStore,
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
