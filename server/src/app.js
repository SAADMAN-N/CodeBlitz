const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const runRoute = require('./routes/run');
const matchRoute = require('./routes/match');
const authRoute = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/codeblitz', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', runRoute);
app.use('/api', matchRoute);
app.use('/api/auth', authRoute);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});