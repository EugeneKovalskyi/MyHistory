> [!IMPORTANT]
> Инструкция по запуску приложения
> 1. Скачать проект
> 2. **npm i** - установить зависимости папке MyHistory
> 3. **sudo apt install postgresql postgresql-client** - установить СУБД postgresql
> 4. **sudo -u postgres psql** - войти в СУБД 
> 5. Инициализировать БД 
     <details>
        <summary>Инструкции</summary>
        **// Изменить пароль**  
        ALTER USER postgres WITH PASSWORD 'root';  
        <br>
        ** // Создать БД**  
        CREATE DATABASE my_history;  
         <br>
        // Подключится к БД   
        \c my_history;    
           <br>
        **// Создание таблиц **  
        CREATE TABLE users (  
        id SERIAL PRIMARY KEY,  
        login VARCHAR(32) UNIQUE NOT NULL);  
        <br>
        CREATE TABLE events (  
        id BIGSERIAL PRIMARY KEY,  
        title VARCHAR(64) NOT NULL,  
        date DATE NOT NULL,  
        description TEXT,  
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE);    
        <br>
        CREATE TABLE tags (  
        name VARCHAR(64) PRIMARY KEY);  
        <br>
        CREATE TABLE events_tags (  
        event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,  
        tag_name VARCHAR REFERENCES tags(name),  
        PRIMARY KEY (event_id, tag_name));  
        <br>
        CREATE TABLE photos (  
        id BIGSERIAL PRIMARY KEY,  
        path VARCHAR(256) UNIQUE NOT NULL,  
        width SMALLINT NOT NULL,  
        height SMALLINT NOT NULL,  
        event_id BIGINT REFERENCES events(id) ON DELETE CASCADE);  
    </details>
> 6. **npm run dev:back** - запустить сервер 
> 7. **npm run dev:front** - запустить клиент 
> 8. Открыть страницу **http://localhost:3000**

### Доступный функционал

1. Страница "События"
2. Кнопка "Добавить событие"
3. Добавление события на страницу и сохранение в БД
4. Редактирование и удаление события
5. Получение списка событий

### В разарботке

1. Авторизация
2. Сортировка списка событий
3. Поиск по списку событий

### Текущие задачи

1. Внедрить TypeScript
2. Перенести сервер на Express

***

## Описание проекта

> [!NOTE]
> Суть проекта - специализированный дневник.

***Основные задачи проекта:***
  - Запись важных событий и целей в жизни пользователя, которыми ему хотелось бы поделиться с близкими или со всем человечеством.
  - Помощь намечать цели в жизни.
  - Отслеживание выполнения этих целей.

***Второстепенный функционал:***
  - Список книг, которые пользователь планирует прочитать или уже прочитал.
  - Список кино, которое пользователь планирует посмотреть или уже посмотрел.
  - Список полезных заметок.

> [!TIP]
> - [Архитектура проекта](https://miro.com/app/board/uXjVLZMfJK0=/?share_link_id=808692328607)
> - [Схема БД](https://app.diagrams.net/#HEugeneKovalskyi%2FMyHistory%2Fmain%2Fserver%2Fdb%2Fdb.drawio#%7B%22pageId%22%3A%229f46799a-70d6-7492-0946-bef42562c5a5%22%7D)
