const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailSG = async (data) => {
    const email = { ...data, from: 'marketing@gto.ua' };
    await sgMail.send(email);
    return true;
};

module.exports = sendEmailSG;
