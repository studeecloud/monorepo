require('dotenv').config();
const { ENVIRONMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// database connection
const db = require('./configs/db.config');

// routes import
const usersRoutes = require('./routes/users');
const videoRoutes = require('./routes/video');
const messagesRoutes = require('./routes/messages');

const app = express();

// middleware setup
app.use(cors());
app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

//Accessing static sound file => acess URL in format: /public/[filename.mp3]
app.use('/public', express.static(__dirname + '/public'));

console.log(__dirname);

// routes
app.use('/users', usersRoutes(db));
app.use('/video', videoRoutes());
app.use('/messages', messagesRoutes(db));

app.get('/', (req, res) => {
  res.json({ greetings: 'hello world' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
