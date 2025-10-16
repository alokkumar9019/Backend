const socket = io();

const nameInput = document.getElementById('name');
const registerBtn = document.getElementById('registerBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const usersDiv = document.getElementById('users');
const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const adminBroadcastBtn = document.getElementById('adminBroadcastBtn');

let currentName = null;


registerBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return alert('Enter a name');
  currentName = name;
  socket.emit('register', { name });
};


disconnectBtn.onclick = () => socket.emit('manualDisconnect');

sendBtn.onclick = () => {
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit('sendMessage', { text });
  messageInput.value = '';
};


adminBroadcastBtn.onclick = () => {
  const text = prompt('Enter broadcast message:');
  if (!text) return;
  socket.emit('adminBroadcast', { text });
};


socket.on('onlineUsers', (users) => {
  usersDiv.innerHTML = users.map(u => `<div>${u.name}</div>`).join('');
});

socket.on('chatHistory', (msgs) => {
  chatDiv.innerHTML = '';
  msgs.forEach(addMessage);
});

socket.on('newMessage', addMessage);

socket.on('userJoined', ({ name }) => {
  chatDiv.innerHTML += `<div>${name} joined the chat</div>`;
});

socket.on('userLeft', ({ name }) => {
  chatDiv.innerHTML += `<div>${name} left the chat</div>`;
});

socket.on('errorMsg', (msg) => alert(msg));

function addMessage(msg) {
  const div = document.createElement('div');
  div.innerHTML = `<span class="${msg.isAdmin ? 'admin' : ''}">${msg.name}</span>: ${msg.text}`;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
