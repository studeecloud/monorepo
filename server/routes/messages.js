const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const getMessages = 'SELECT * FROM messages JOIN meetings ON meeting_id = meetings.id WHERE meeting_id = 1';
    db.query(getMessages).then((data) => {
      // console.log('message data', data.rows);
      res.json(data.rows);
    });
  });
  router.post('/', (req, res) => {
    const insertMessage = `INSERT INTO messages VALUES($1, $2, $3)`;
    const msgCountQuery = `SELECT COUNT(*) FROM messages;`;

    db.query(msgCountQuery).then((data) => {
      console.log(
        'LOGGING "parseInt(data.rows[0].count)":',
        parseInt(data.rows[0].count)
      );
      const msgCount = parseInt(data.rows[0].count);
      db.query(insertMessage, [msgCount + 1, req.body.message, req.body.userName]).then(
        (data) => {
          res.json({ status: 'success' });
        }
      );
    });
  });
  return router;
};
