const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB setup.
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true});

// App setup.
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup.
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
