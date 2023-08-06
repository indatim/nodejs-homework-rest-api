const { User } = require("../../models/user");
const { HttpError, sendEmailSG } = require("../../helpers");
// const { HttpError, sendEmailMeta } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>Click verify email</a>`,
  };

    await sendEmailSG(verifyEmail);
    // await sendEmailMeta(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;