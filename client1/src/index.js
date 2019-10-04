import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import './index.css';
import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/about" render={() => <h1>About page</h1>}/>
      <Route path="/tracks/:id" render={() => <h1>Tracks page</h1>}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);


// "react": "^16.10.2",
//     "react-dom": "^16.10.2",
//     "react-scripts": "3.2.0",
//     "react-redux": "^5.0.4",
//     "react-router": "3.0.2",
//     "react-router-redux": "^4.0.8",
//     "redux": "^3.6.0",
//     "redux-devtools-extension": "^2.13.1",
//     "redux-thunk": "^2.2.0"