const router = require('express').Router();

module.exports = (db) => {
  router.get('/:meetingName', (req, res) => {
    // TODO - get meeting name from req
    const getMessages = `SELECT messages.id, message, sender FROM messages JOIN meetings ON meeting_id = meetings.id WHERE meeting_id = (SELECT id FROM meetings WHERE meeting_name = '${req.params.meetingName}');`;
    db.query(getMessages).then((data) => {
      // console.log('message data', data.rows);
      res.json(data.rows);
    });
  });
  router.post('/', (req, res) => {
    const insertMessageQuery = `INSERT INTO messages VALUES($1, $2, $3, $4)`;
    const msgCountQuery = `SELECT COUNT(*) FROM messages;`;

    const meetingIDQuery = `SELECT id FROM meetings WHERE meeting_name = '${req.body.roomName}'`;

    db.query(meetingIDQuery).then((data) => {
      const meetingID = parseInt(data.rows[0]);
      console.log('meetingID: ', meetingID);

      db.query(msgCountQuery).then((data) => {
        console.log(
          'LOGGING "parseInt(data.rows[0].count)":',
          parseInt(data.rows[0].count)
        );
        const msgCount = parseInt(data.rows[0].count);
        db.query(insertMessageQuery, [
          msgCount + 1,
          req.body.message,
          req.body.userName,
          meetingID,
        ]).then((data) => {
          res.json({ status: 'success' });
        });
      });
    })

  });
  return router;
};
