const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));
app.set('views', publicDir);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
  console.info(`Socket conectado: ${socket.id}`);

  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    io.emit('receivedMessage', data);
  });

});

server.listen(3000, '0.0.0.0');