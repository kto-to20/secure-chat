const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Установка статического каталога для файлов (если все в одной папке)
app.use(express.static(__dirname));

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Измените на имя вашего файла
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
