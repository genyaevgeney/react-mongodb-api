const Validator = require('validator');
const isEmpty = require('./is-empty');
const zxcvbn = require('zxcvbn');

module.exports = function validateRegisterInput(password) {
    let errors = {};
    password = !isEmpty(password) ? password : '';
    const evaluation = zxcvbn(password)

    if(!Validator.isLength(password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(password)) {
        errors.password = 'Password is required';
    }

    if(!isEmpty(evaluation.feedback.suggestions)) {
        errors.password = evaluation.feedback.suggestions
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}