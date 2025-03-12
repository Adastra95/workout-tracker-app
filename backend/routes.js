const express = require("express");
const router = express.Router();
const db = require("./db");

// Получение всех тренировок
router.get("/workouts", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM workouts");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера при получении тренировок." });
    }
});

// Добавление новой тренировки
router.post("/workouts", async (req, res) => {
    const { user_id, date, notes } = req.body;

    if (!user_id || !date) {
        return res.status(400).json({ message: "Недостаточно данных для создания тренировки." });
    }

    try {
        const [result] = await db.execute(
            "INSERT INTO workouts (user_id, date, notes) VALUES (?, ?, ?)",
            [user_id, date, notes]
        );
        res.status(201).json({ message: "Тренировка добавлена", id: result.insertId });
    } catch (err) {
        console.error("Ошибка при добавлении тренировки:", err);
        res.status(500).json({ message: "Ошибка сервера при добавлении тренировки." });
    }
});

// Удаление тренировки по ID
router.delete("/workouts/:id", (req, res) => {
    const workoutId = req.params.id;

    db.execute("DELETE FROM workouts WHERE id = ?", [workoutId])
        .then(() => {
            res.status(200).json({ message: "Тренировка удалена" });
        })
        .catch((err) => {
            console.error("Ошибка при удалении тренировки:", err);
            res.status(500).json({ message: "Ошибка при удалении тренировки" });
        });
});

module.exports = router;
