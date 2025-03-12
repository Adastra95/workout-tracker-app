document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-workout-form");
    const workoutList = document.getElementById("workout-list");

    // Функция для получения всех тренировок
    async function getWorkouts() {
        const response = await fetch("http://localhost:3000/api/workouts");
        const workouts = await response.json();
        console.log("Полученные тренировки:", workouts);  // Логируем ответ сервера

        workoutList.innerHTML = workouts.map(workout => `
            <li>
                <strong>ID: ${workout.id}</strong><br>
                Дата: ${workout.date}<br>
                Заметки: ${workout.notes}
            </li>
        `).join("");
    }

    // Отправка формы
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user_id = document.getElementById("user_id").value;
        const date = document.getElementById("date").value;
        const notes = document.getElementById("notes").value;

        console.log("Данные формы:", { user_id, date, notes });  // Логируем данные формы

        const response = await fetch("http://localhost:3000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, date, notes })
        });

        if (response.ok) {
            alert("✅ Тренировка добавлена!");
            getWorkouts();  // Перезагружаем список тренировок
            form.reset();  // Очищаем форму
        } else {
            alert("❌ Ошибка при добавлении тренировки");
        }
    });

    // Получаем все тренировки при загрузке страницы
    getWorkouts();
});
document.getElementById("history-button").addEventListener("click", () => {
    window.location.href = "history.html";  // Переход на страницу истории тренировок
});
// Функция для удаления тренировки
async function deleteWorkout(workoutId) {
    const response = await fetch(`http://localhost:3000/api/workouts/${workoutId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("✅ Тренировка удалена!");
        getWorkouts(); // обновляем список тренировок
    } else {
        alert("❌ Ошибка при удалении тренировки");
    }
}

// Пример того, как это будет работать в списке тренировок
async function getWorkouts() {
    const response = await fetch("http://localhost:3000/api/workouts");
    const workouts = await response.json();
    console.log("Полученные тренировки:", workouts);

    const workoutList = document.getElementById("workouts");
    workoutList.innerHTML = workouts.map(workout => `
        <li>
            <strong>ID: ${workout.id}</strong><br>
            Дата: ${workout.date}<br>
            Заметки: ${workout.notes}
            <button onclick="deleteWorkout(${workout.id})">Удалить</button> <!-- Кнопка для удаления -->
        </li>
    `).join("");
}
