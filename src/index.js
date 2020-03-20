import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import configureStore from './redux';
import Header from './components/header/header';
import Routes from './routes/';
import SocketContext from './util/socket-context'
import { getApiUrl } from './util/environment-utils';
import io from 'socket.io-client';

// Import stylesheets
import './assets/stylesheets/base.scss';

const store = configureStore();
const socket = io(`${getApiUrl()}`);

ReactDOM.render((
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  </SocketContext.Provider>
), document.getElementById('root'));

// Enable hot relading
//module.hot.accept();
