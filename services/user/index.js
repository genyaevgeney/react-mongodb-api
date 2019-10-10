const userRepository = require("../../repositories/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../../database').userModel;

class UserService {

  async register(bodyData) {
    const user = await userRepository.findByEmail(bodyData.email)
    if (user) {
        return {
            status: 400,
            data: {
                email: 'Email already exists'
            }
        }
    }

    const userData = {
        login: bodyData.name,
        email: bodyData.email,
        password: bodyData.password

    }
    const processingResult = await bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(userData.password, salt, (err, hash) => {
                if(err) {
                    console.error('There was an error', err);
                    return
                }
                userData.password = hash;
                userRepository.create(userData)
            });
        }
    });

    return {
        status: 200,
        data: {
            isSuccessRegistration: true
        }
    }
}

async login(bodyData) {
    const email = bodyData.email;
    const password = bodyData.password;

    const user = await userRepository.findByEmail(bodyData.email)

    if(!user) {
        return {
            status: 404,
            data: {
                email: 'User not found'
            }
        }
    }
    let incorrectPassword = false
    let successLogin = false
    const processingResult = await bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(isMatch) {
            const payload = {
                id: user.id,
                login: user.login
            }
            return new Promise((resolve, reject) => {
                jwt.sign(payload, 'secret', {
                    expiresIn: 3600
                }, (err, token) => {
                    if(err) {
                        console.error('There is some error in token', err)
                        return
                    }
                    resolve({
                        status: 200,
                        data: {
                            success: true,
                            token: `Bearer ${token}`
                        }
                    })
                });
            })
        }
        return {
            status: 400,
            data: {
                password: 'Incorrect Password'
            }
        }
    });
    return processingResult
} 
}

module.exports = new UserService();
