import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authPage = (
        	<div>
            <h1>Home Component</h1>
        	<span>Hello, {user.login}!</span>
        	</div>
        )
      const guestPage = (
      	<div>
        <h1>Home Component</h1>
        <span>Hello, Guest!</span>
        </div>
      )
        return(
        	<div>
        	<Navbar router={this.props.ownProps.router}/>
            {isAuthenticated ? authPage : guestPage}
            </div>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    ownProps
})

export default connect(mapStateToProps)(Home);