const socket = io('http://localhost:3000');

const chat = document.querySelector('#chat');
const messages = document.querySelector('.messages');

function renderMessage(message) {
  let messageNode = document.createElement('div');
  messageNode.innerHTML = `<strong>${message.author}:</strong> ${message.message}`;
  messages.appendChild(messageNode);
}

socket.on('previousMessages', (messages) => {
  for(message of messages) {
    renderMessage(message);
  }
});

socket.on('receivedMessage', (message) => {
  console.log('Recebeu')
  renderMessage(message);
});

chat.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const author = document.querySelector('#username');
  const message = document.querySelector('#message');

  if(author.value.length && message.value.length) {
    var messageObject = {
      author: author.value,
      message: message.value,
    }
  }
  socket.emit('sendMessage', messageObject);
  message.value = '';
});