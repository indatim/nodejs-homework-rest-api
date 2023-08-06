const express = require('express');

const ctrl = require('../../controllers/auth');

const { bodyValidator, userIdValidator, authentificator, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', bodyValidator(schemas.registerSchema), ctrl.registerUser);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post("/verify", bodyValidator(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', bodyValidator(schemas.loginSchema), ctrl.loginUser);

router.get('/current', authentificator, ctrl.getCurrentUser);

router.post('/logout', authentificator, ctrl.logoutUser);

router.patch(
  '/:id/subscription',
  authentificator,
  userIdValidator, ctrl.updateSubscriptionUser
);

router.patch('/avatars', authentificator, upload.single('avatar'), ctrl.updateUserAvatar);

module.exports = router;