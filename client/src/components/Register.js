import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser, loginUser } from "../actions/authentication";
import classnames from "classnames";
import Navbar from "./Navbar";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    let { data } = await this.props.registerUser(user);
    if (data.isSuccessRegistration) this.props.loginUser(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.ownProps.router.push("/userdashboard/1");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.ownProps.router.push("/userdashboard/1");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <div
          className="container"
          style={{ marginTop: "50px", width: "700px" }}
        >
          <h2 style={{ marginBottom: "40px" }}>Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password_confirm
                })}
                name="password_confirm"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
              {errors.password_confirm && (
                <div className="invalid-feedback">
                  {errors.password_confirm}
                </div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  errors: state.errors,
  ownProps
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(Register);
