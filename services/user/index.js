const userRepository = require("../../repositories/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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
        password: bodyData.password,
        resetPasswordToken:'null',
        resetPasswordExpires: new Date()
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

async forgotPassword(bodyData) {
    const email = bodyData.email;

    const user = await userRepository.findByEmail(bodyData.email)

    if(!user) {
        return {
            status: 404,
            data: {
                email: 'Email not found'
            }
        }
    }

    const token = crypto.randomBytes(20).toString('hex');
    const passwordExpires = Date.now() + 360000;
    const data = {
        login: user.login
    }

    userRepository.updatePasswordToken(data, token, passwordExpires)

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `javascriptwork2019@gmail.com`,
            pass: `javascriptwork`,
          },
        });

        const mailOptions = {
          from: 'javascriptwork2019@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');
        return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
             resolve({
                    status: 200,
                    data: {
                        isSuccessSendingMail: true
                    }
        })
          }
        });
        })
        
        
        
    // let incorrectPassword = false
    // let successLogin = false
    // const processingResult = await bcrypt.compare(password, user.password)
    // .then(isMatch => {
    //     if(isMatch) {
    //         const payload = {
    //             id: user.id,
    //             login: user.login
    //         }
    //         return new Promise((resolve, reject) => {
    //             jwt.sign(payload, 'secret', {
    //                 expiresIn: 3600
    //             }, (err, token) => {
    //                 if(err) {
    //                     console.error('There is some error in token', err)
    //                     return
    //                 }
    //                 resolve({
    //                     status: 200,
    //                     data: {
    //                         success: true,
    //                         token: `Bearer ${token}`
    //                     }
    //                 })
    //             });
    //         })
    //     }
    //     return {
    //         status: 400,
    //         data: {
    //             password: 'Incorrect Password'
    //         }
    //     }
    // });
    // return processingResult
} 
}

module.exports = new UserService();
