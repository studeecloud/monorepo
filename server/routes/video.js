const router = require('express').Router();
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

module.exports = () => {
  router.get('/token/:user/:room', (req, res) => {
    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: req.params.room,
    });

    // Create an access token which we will sign and return to the client, containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      { identity: req.params.user }
    );
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    res.send(token.toJwt());
  });
  return router;
};
