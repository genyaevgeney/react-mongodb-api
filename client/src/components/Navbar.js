import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import "../assets/scss/Navbar.css";

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.router);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(this.props.router);
    const authLinks = (
      <div className="navbar-wrap">
        <Link
          className="navbar-first-element navbar-brand"
          to="/userdashboard/1"
        >
          Main Page
        </Link>
        <ul className="navbar-middle-element navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/userdashboard/1">
              My dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/page=1">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/donation">
              Donate
            </Link>
          </li>
        </ul>
        <ul className="navbar-last-element navbar-middle-element navbar-nav ml-auto">
          <li className="nav-item">
            <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
    const guestLinks = (
      <div className="navbar-wrap">
        <Link className="navbar-first-element navbar-brand" to="/">
          Main Page
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/page=1">
              Dashboard
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
