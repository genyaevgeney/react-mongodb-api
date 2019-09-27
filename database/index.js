require('dotenv').config()
const mongoose = require('mongoose')

mongoose
	.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});

const UserSchema = new mongoose.Schema({
  login: String,
  email: String,
  password: String
});

const DonationSchema = new mongoose.Schema({
  volunteerName: String,
  email: String,
  amount: Number,
  message: String,
  date: {
    type: Date,
    default: Date.now}
});

exports.donationModel = mongoose.model('donation', DonationSchema);
exports.userModel = mongoose.model('user', UserSchema);
exports.connection = mongoose.connection
