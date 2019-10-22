const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const params = {
  body: 'Your order is pending!',
  from: '+12085476957',
  to: '+16473955386'
}

const sendSMS = params => {
  client.messages
  .create(params)
  .then(message => console.log(message.sid));
}
module.exports = { sendSMS }
