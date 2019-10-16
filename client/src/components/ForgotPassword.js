import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../actions/authentication";
import classnames from "classnames";
import Navbar from "./Navbar";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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
    const data = {
      email: this.state.email
    };
    const isSuccessSendingMail = await this.props.resetPassword(data);
    console.log(isSuccessSendingMail);
    if (isSuccessSendingMail) this.props.ownProps.router.push("/login");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
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
          <h2 style={{ marginBottom: "40px" }}>Reset password</h2>
          <form onSubmit={this.handleSubmit}>
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
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
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
  { resetPassword }
)(ForgotPassword);
