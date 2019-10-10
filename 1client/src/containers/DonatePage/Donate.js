import React from 'react';
// import Header from '../../components/DashboardPage/Header';
import '../../assets/scss/DonatePage.css';
import DonationService from "../../services/DonationService";
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';

class DonatePage extends React.Component  {

	constructor(){
		super()
		this.nameInput = ""
		this.emailInput = ""
		this.amountInput = ""
		this.messageInput = ""

	}

	postData() {
		const strData = JSON.stringify({
			name: this.nameInput.value,
			email: this.emailInput.value,
			amount: this.amountInput.value,
			message: this.messageInput.value
		});
		DonationService.postData(strData);

		this.props.ownProps.router.push("/page=1")
	}

	// componentDidMount() {
 //        if(!this.props.auth.isAuthenticated) {
 //            this.props.ownProps.router.push('/');
 //        }
 //    }

	
	render() {
		console.log(this.props.ownProps)
		return (
			<div>
			<Navbar router={this.props.ownProps.router}/>
			<div className="container">
			<div className="row Donating__main-row justify-content-center align-items-center">
			<div className="col-6">
			<h1 className="Donating__headline-of-page">Donate</h1>
			<form className="Donating__form">
			<label>
			Name
			<input ref={(input) => { this.nameInput = input }} name="name" type="text" className="Donating__input-name" required/>
			</label>
			<label>
			Email
			<input ref={(input) => { this.emailInput = input }} name="email" type="email" className="Donating__input-email" pattern=".+@globex.com" required/>
			</label>
			<label>
			Amount
			<input ref={(input) => { this.amountInput = input }} name="amount" type="text" className="Donating__input-amount" required/>
			</label>
			<label>
			Message
			<input ref={(input) => { this.messageInput = input }} name="message" type="text" className="Donating__input-message" required/>
			</label>
			<button onClick={this.postData.bind(this)} className="Donating__input-btn">DONATE</button>
			</form>
			</div>
			</div>
			</div>
			</div>
			)
	}
}

export default connect((state, ownProps) => ({auth: state.auth, ownProps}))(DonatePage);