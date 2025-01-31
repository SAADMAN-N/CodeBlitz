const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const runRoute = require('./routes/run');
const matchRoute = require('./routes/match');
const authRoute = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/codeblitz', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', runRoute);
app.use('/api', matchRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});