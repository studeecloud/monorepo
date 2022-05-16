require('dotenv').config();
const {ENVIRONMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// database connection
const db = require('./configs/db.config');

// routes import
const usersRoutes = require('./routes/users'); 

const app = express();

// middleware setup
app.use(cors());
app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

// routes
app.use('/users', usersRoutes(db));

app.get('/', (req, res) => {
  res.json({greetings: 'hello world'});
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));