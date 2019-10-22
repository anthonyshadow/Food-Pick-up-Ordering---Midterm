const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {
  client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+12085476957',
       to: '+16473955386'
     })
    .then(message => console.log(message.sid));
};
