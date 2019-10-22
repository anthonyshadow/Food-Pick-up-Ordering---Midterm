const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const accountSid = 'AC6146c30ede9b143d4928d02fea9f61e5';
const authToken = 'ef55dd2457fe3fab6ab8a1dc70dd6f63';
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
