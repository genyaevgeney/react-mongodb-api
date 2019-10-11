const userService = require("../../services/user");
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



exports.register = async (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateRegisterInput(req.body);
    

    if(!isValid) {
        return res.status(400).json(errors);
        console.log(errors)
    }

	const processingResult = await userService.register(req.body)
	if (processingResult.status === 400) {
        return res.status(processingResult.status).json(processingResult.data);
        console.log(processingResult.data)
    }
    res.json(processingResult.data)
    console.log(processingResult.data)
};

exports.login = async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const processingResult = await userService.login(req.body)
    if (processingResult.status === 404) {
        return res.status(processingResult.status).json(processingResult.data);
    }

    if (processingResult.status === 400) {
        return res.status(processingResult.status).json(processingResult.data);
    }

    res.json(processingResult.data)

}

exports.authenticate = (req, res) => {
	return res.json({
        id: req.user.id,
        login: req.user.login,
        email: req.user.email
    });
}
