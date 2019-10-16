import Navbar from "./Navbar";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      validPasErrMsg: "",
      login: "",
      password: "",
      password_confirm: "",
      updated: false,
      isLoading: true,
      error: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get("http://react-mongodb-api.com/reset", {
        params: {
          resetPasswordToken: this.props.ownProps.params.token
        }
      });
      // console.log(response);
      if (response.data.message === "password reset link a-ok") {
        this.setState({
          login: response.data.login,
          updated: false,
          isLoading: false,
          error: false
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
    }
  }

  // handleChange = name => (event) => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    // e.preventDefault();
    // const user = {
    //     name: this.state.name,
    //     email: this.state.email,
    //     password: this.state.password,
    //     password_confirm: this.state.password_confirm
    // }
    // let { data } = await this.props.registerUser(user);
    // if(data.isSuccessRegistration) this.props.loginUser(user)

    e.preventDefault();
    const { login, password, password_confirm } = this.state;
    try {
      const response = await axios.put(
        "http://react-mongodb-api.com/updatePasswordViaEmail",
        {
          login,
          password,
          password_confirm,
          resetPasswordToken: this.props.ownProps.params.token
        }
      );
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false,
          validPasErrMsg: ""
        });
      } else {
        this.setState({
          updated: false,
          error: true
        });
      }
    } catch (error) {
      this.setState({
        validPasErrMsg: error.response.data,
        password: "",
        password_confirm: ""
      });
    }
  }

  render() {
    const { error, isLoading, updated, validPasErrMsg } = this.state;
    if (error) {
      return (
        <div>
          <Navbar />
          <div class="alert alert-danger">
            <strong>Danger!</strong> Problem resetting password. Please send
            another reset link.
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <Navbar />
          <div>Loading User Data...</div>
        </div>
      );
    }
    if (updated) {
      return (
        <div>
          <Navbar />
          <div class="alert alert-success">
            <strong>Success!</strong> Your password has been successfully reset,
            please try logging in again.
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div
          className="container"
          style={{ marginTop: "50px", width: "700px" }}
        >
          <h2 style={{ marginBottom: "40px" }}>Change password</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                placeholder="New password"
                className={"form-control form-control-lg"}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className={"form-control form-control-lg"}
                name="password_confirm"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
            </div>
            {validPasErrMsg && (
              <div class="alert alert-danger">
                <strong>Danger!</strong> {validPasErrMsg}.
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// ResetPassword.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired,
//     }),
//   }),
// };

const mapStateToProps = (state, ownProps) => ({
  ownProps
});

export default connect(mapStateToProps)(ResetPassword);
