import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Dashboard from './containers/DashboardPage/Dashboard';
import Donate from './containers/DonatePage/Donate';
import './assets/scss/bootstrap.min.css';
import reducer from './reducers';
import ErrorPage from './components/ErrorPage/ErrorPage';
// import About from './About';
// import Track from './Track';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/page=:id" component={Dashboard}/>
      <Route path="/donation" component={Donate}/>
      <Route path="*" component={ErrorPage}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
