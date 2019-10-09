const router = require('../../server.js').router
const userController = require('../../controllers/user')
const passport = require('passport');

// const gravatar = require('gravatar');





router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), userController.authenticate);

module.exports = router;