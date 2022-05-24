const router = require('express').Router();

module.exports = (db) => {
  router.get('/:meetingName', (req, res) => {
    const getMessages = `SELECT id, message, sender, meeting_name FROM messages WHERE meeting_name = '${req.params.meetingName}';`;
    db.query(getMessages).then((data) => {
      res.json(data.rows);
    });
  });

  router.post('/', (req, res) => {
    const insertMessageQuery = `INSERT INTO messages VALUES($1, $2, $3, $4)`;
    const msgCountQuery = `SELECT COUNT(*) FROM messages;`;

    db.query(msgCountQuery).then((data) => {
      const msgCount = parseInt(data.rows[0].count);
      db.query(insertMessageQuery, [
        msgCount + 1,
        req.body.message,
        req.body.userName,
        req.body.roomName,
      ]).then((data) => {
        res.json({ status: 'success' });
      });
    });
  });
  return router;
};
