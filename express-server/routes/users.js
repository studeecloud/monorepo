const router = require('express').Router();

module.exports = () => {
  router.get('/', (req, res) => {
    const users = ['Gonzo', 'Kehan', 'Lisa'];
    res.json(users);
  });
  return router;
}