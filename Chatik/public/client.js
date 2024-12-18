const socket = io(); // Подключение к серверу через Socket.io

// Элементы страницы
const usernameInput = document.getElementById('username');
const joinChatBtn = document.getElementById('join-chat');
const welcomeScreen = document.getElementById('welcome-screen');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const leaveChatBtn = document.getElementById('leave-chat');

let username = ''; // Имя пользователя

// Обработчик кнопки Join Chat
joinChatBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        // Отправляем событие на сервер
        socket.emit('join', username);

        // Переключаем экран
        welcomeScreen.classList.add('hidden');
        chatContainer.classList.remove('hidden');
    } else {
        alert('Please enter a valid username.');
    }
});

// Обработчик кнопки Leave Chat
leaveChatBtn.addEventListener('click', () => {
    socket.emit('leave', username); // Уведомляем сервер
    chatContainer.classList.add('hidden'); // Прячем чат
    welcomeScreen.classList.remove('hidden'); // Показываем экран входа
    usernameInput.value = ''; // Очищаем поле имени
});

// Обработка отправки сообщений
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        // Отправляем сообщение на сервер
        socket.emit('message', { username, message });
        messageInput.value = ''; // Очищаем поле ввода
    }
});

// Получение сообщений от сервера
socket.on('message', (data) => {
    // Создаем элемент сообщения
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${data.username}: ${data.message}`;

    // Добавляем сообщение в контейнер
    chatMessages.appendChild(messageElement);

    // Автопрокрутка вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
