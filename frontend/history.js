document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("workouts-history");
    const backButton = document.getElementById("back-button");

    // Функция для получения всех тренировок
    async function getWorkoutsHistory() {
        const response = await fetch("http://localhost:3000/api/workouts");

        if (!response.ok) {
            console.error("Ошибка при получении данных");
            return;
        }

        const workouts = await response.json();
        console.log("Полученные тренировки:", workouts);  // Логируем тренировки

        historyList.innerHTML = workouts.map(workout => `
            <li>
                <strong>ID: ${workout.id}</strong><br>
                Дата: ${workout.date}<br>
                Заметки: ${workout.notes}
            </li>
        `).join("");
    }

    // Загружаем все тренировки при загрузке страницы
    getWorkoutsHistory();

    // Возвращаем на главную страницу
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";  // Переход на главную страницу
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const workoutsHistory = document.getElementById("workouts-history");

    // Функция для получения всех тренировок
    async function getWorkouts() {
        const response = await fetch("http://localhost:3000/api/workouts");
        const workouts = await response.json();
        console.log("Полученные тренировки:", workouts);  // Логируем ответ сервера

        // Отображаем список тренировок с кнопками удаления
        workoutsHistory.innerHTML = workouts.map(workout => `
            <li>
                <strong>ID: ${workout.id}</strong><br>
                Дата: ${workout.date}<br>
                Заметки: ${workout.notes}<br>
                <button class="delete-btn" data-id="${workout.id}">Удалить</button>
            </li>
        `).join("");
    }

    // Функция для удаления тренировки
    async function deleteWorkout(id) {
        const response = await fetch(`http://localhost:3000/api/workouts/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("✅ Тренировка удалена!");
            getWorkouts();  // Перезагружаем список тренировок после удаления
        } else {
            alert("❌ Ошибка при удалении тренировки");
        }
    }

    // Слушаем клик по кнопке удаления тренировки
    workoutsHistory.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const workoutId = e.target.getAttribute("data-id");
            deleteWorkout(workoutId);  // Вызываем функцию удаления тренировки
        }
    });

    // Получаем все тренировки при загрузке страницы
    getWorkouts();

    // Обработчик для кнопки возврата
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "index.html";  // Переход на страницу главной страницы
    });
});
