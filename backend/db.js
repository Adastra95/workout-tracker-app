const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к MySQL:", err.message);
    } else {
        console.log("Подключение к базе данных MySQL успешно установлено");
    }
});

// Экспортируем промис-версию соединения
module.exports = db.promise();
