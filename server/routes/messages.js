const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const getMessages = "SELECT * FROM messages";
    db.query(getMessages)
      .then(data => {
        console.log('message data', data);
        res.json(data.rows);
      })

  });
  router.post('/', (req, res) => {
    const insertMessage = `INSERT INTO messages VALUES($1)`;
    console.log('req', req.body);
    db.query(insertMessage, [req.body.message_text])
      .then(data => {
        res.json({ "status": "success" });
      })
  });
  return router;
}