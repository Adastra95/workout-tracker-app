const express = require("express");
const path = require("path");
const cors = require("cors");
const workoutRoutes = require("./routes"); // импорт роутера с API
const db = require("./db"); // подключение к базе данных

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Отдаем статические файлы из папки "frontend"
app.use(express.static(path.join(__dirname, "../frontend")));

// Подключаем API роуты
app.use("/api", workoutRoutes);

// Обработка всех остальных GET-запросов - отдаем index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
