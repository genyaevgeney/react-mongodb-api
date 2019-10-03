import { Provider } from "react-redux";
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {Router, Route, browserHistory} from 'react-router';
var React = require("react");
var ReactDOM = require("react-dom");
var redux = require("redux");
var reducer = require("./reducer.jsx");
var AppView = require("./appview.jsx");
 
 


 class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
 
ReactDOM.render(
  <Car/>,
  document.getElementById("container")
);