const userService = require("../../services/user");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateResetPassword = require("../../validation/reset-password");
const validateUpdatePassword = require("../../validation/update-password");

exports.register = async (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
    console.log(errors);
  }

  const processingResult = await userService.register(req.body);
  if (processingResult.status === 400) {
    return res.status(processingResult.status).json(processingResult.data);
    console.log(processingResult.data);
  }
  res.json(processingResult.data);
  console.log(processingResult.data);
};

exports.login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const processingResult = await userService.login(req.body);
  if (processingResult.status === 404) {
    return res.status(processingResult.status).json(processingResult.data);
  }

  if (processingResult.status === 400) {
    return res.status(processingResult.status).json(processingResult.data);
  }

  res.json(processingResult.data);
};

exports.forgotPassword = async (req, res) => {
  const { errors, isValid } = validateResetPassword(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const processingResult = await userService.forgotPassword(req.body);
  if (processingResult.status === 404) {
    return res.status(processingResult.status).json(processingResult.data);
  }

  res.json(processingResult.data);
};

exports.updatePasswordViaEmail = async (req, res) => {
  const dataObj = {
    login: req.body.login,
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: {
      $gte: Date.now()
    }
  };
  const password = req.body.password;
  const confirmPassword = req.body.password_confirm;
  const { errors, isValid } = validateUpdatePassword(password, confirmPassword);

  if (!isValid) {
    return res.status(400).json(errors.password);
  }

  const processingResult = await userService.updatePasswordViaEmail(
    dataObj,
    password
  );

  if (processingResult.status !== 200) {
    return res.status(processingResult.status).json(processingResult.data);
  }
  res.json(processingResult.data);
};

exports.resetPassword = async (req, res) => {
  console.log(req.query.resetPasswordToken);
  const processingResult = await userService.resetPassword(
    req.query.resetPasswordToken
  );
  if (processingResult.status === 403) {
    return res.status(processingResult.status).json(processingResult.data);
  }
  res.json(processingResult.data);
};

exports.authenticate = (req, res) => {
  return res.json({
    id: req.user.id,
    login: req.user.login,
    email: req.user.email
  });
};
