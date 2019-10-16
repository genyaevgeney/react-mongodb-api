require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/MernDb";
mongoose
  .connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
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
    default: Date.now
  }
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
  },
  resetPasswordToken: {
    type: String,
    required: true
  },
  resetPasswordExpires: {
    type: Date,
    default: Date.now
  }
});

exports.donationModel = mongoose.model("donation", DonationSchema);
exports.userModel = mongoose.model("user", UserSchema);
exports.connection = mongoose.connection;
