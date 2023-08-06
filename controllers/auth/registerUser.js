const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { randomUUID } = require('crypto');

const { User } = require('../../models/user');

const { HttpError, sendEmailSG } = require('../../helpers');
// const { HttpError, sendEmailMeta } = require("../../helpers");

const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "This email is already in use!");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = randomUUID();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>Click verify email</a>`,
  };

  await sendEmailSG(verifyEmail);
  // await sendEmailMeta(verifyEmail);
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registerUser;