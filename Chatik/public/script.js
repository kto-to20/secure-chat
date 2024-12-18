const socket = io();

// Get DOM elements
const namePrompt = document.getElementById('name-prompt');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const enterChatButton = document.getElementById('enter-chat');
const userNameDisplay = document.getElementById('user-name');
const messagesList = document.getElementById('messages');
const inputMessage = document.getElementById('input');
const form = document.getElementById('form');

// Store username
let username = '';

// Function to show the chat container and set the username
enterChatButton.addEventListener('click', () => {
  username = usernameInput.value.trim();

  if (username) {
    userNameDisplay.textContent = username;
    namePrompt.style.display = 'none';
    chatContainer.style.display = 'block';
  } else {
    alert('Please enter your name.');
  }
});

// Listen for incoming messages
socket.on('chat message', (data) => {
  const li = document.createElement('li');
  li.textContent = `${data.username}: ${data.message}`;
  messagesList.appendChild(li);
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = inputMessage.value.trim();
  if (message) {
    socket.emit('chat message', { username, message });
    inputMessage.value = ''; // Clear input
  }
});
