const router = require("../../server.js").router;
const userController = require("../../controllers/user");
const passport = require("passport");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.authenticate
);
router.post("/forgotPassword", userController.forgotPassword);
router.get("/reset", userController.resetPassword);
router.put("/updatePasswordViaEmail", userController.updatePasswordViaEmail);

module.exports = router;
