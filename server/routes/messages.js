const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const getMessages = 'SELECT * FROM messages';
    db.query(getMessages).then((data) => {
      console.log('message data', data);
      res.json(data.rows);
    });
  });
  router.post('/', (req, res) => {
    const insertMessage = `INSERT INTO messages VALUES($1, $2)`;
    const msgCountQuery = `SELECT COUNT(*) FROM messages;`;
    console.log('req', req.body);

    db.query(msgCountQuery).then((data) => {
      console.log(
        'LOGGING "parseInt(data.rows[0].count)":',
        parseInt(data.rows[0].count)
      );
      const msgCount = parseInt(data.rows[0].count);
      db.query(insertMessage, [msgCount + 1, req.body.message_text]).then(
        (data) => {
          res.json({ status: 'success' });
        }
      );
    });
  });
  return router;
};
