const { ctrlWrapper } = require("../../helpers");

const registerUser = require('./registerUser');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const getCurrentUser = require('./getCurrentUser');
const updateSubscriptionUser = require('./updateSubscriptionUser');
const updateUserAvatar = require('./updateUserAvatar');

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
