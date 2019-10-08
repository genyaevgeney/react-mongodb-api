require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
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

// User.js

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

exports.donationModel = mongoose.model('donation', DonationSchema);
exports.userModel = mongoose.model('user', UserSchema);
exports.connection = mongoose.connection
