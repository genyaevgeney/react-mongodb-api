import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const {isAuthenticated, user} = this.props.auth;
        return(
        	<div>
        	<Navbar router={this.props.ownProps.router}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    ownProps
})

export default connect(mapStateToProps)(Home);