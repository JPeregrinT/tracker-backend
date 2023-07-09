const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/TransactionModel');

function sendWelcomeEmail(name, email) {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'orangetracker05@gmail.com',
        pass: 'pwmjyvihodckcltj'
      }
    });
  
    // Configure the email details
    const mailOptions = {
      from: 'orangetracker05@gmail.com',
      to: email,
      subject: 'Welcome to our Website',
      text: `Hello ${name},\n\nThank you for registering on our website! We are excited to have you on board.\n\nBest regards,\nYour Website Team`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
  module.exports = {sendWelcomeEmail};
