# Treker App

Это проект трекера тренировок.

## Установка

1. Клонируйте репозиторий:
   git clone https://github.com/YOUR_GITHUB_USERNAME/treker-app.git

2.Перейдите в папку backend и установите зависимости:

     cd treker-app/backend
     npm install

3.Создайте файл .env в папке backend со следующими переменными:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=15092005
    DB_NAME=tracker_db   

4.Импорт базы данных Для восстановления базы данных выполните команду (после создания базы данных с именем tracker_db):

    mysql -u root -p tracker_db < database/dump.sql

5.запуск проекта 

   Запустите сервер из папки backend:node server.js
   
   Откройте браузер и перейдите по адресу:http://localhost:3000
