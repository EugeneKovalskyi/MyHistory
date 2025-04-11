## Описание проекта

***Суть проекта - специализированный дневник.***

**Задачи проекта:**
  - Запись важных событий в жизни пользователя.
  - Запись прочитанных книг и просмотренных фильмов.
  - Построение плана жизни на краткосрочную и долгосрочную перспективу.

> [!IMPORTANT]
> **Доступный функционал:**
> 1. Страница "События"
> 2. Кнопка "Добавить событие"
> 3. Добавление события на страницу и сохранение в БД
> 4. Редактирование и удаление события
> 5. Получение списка событий

<br>

## Основные этапы разработки

> [!NOTE]
> - [Архитектура проекта](https://miro.com/app/board/uXjVLZMfJK0=/?share_link_id=808692328607)
> - [Схема БД](https://app.diagrams.net/#HEugeneKovalskyi%2FMyHistory%2Fmain%2Fserver%2Fdb%2Fdb.drawio#%7B%22pageId%22%3A%229f46799a-70d6-7492-0946-bef42562c5a5%22%7D)
 
- [x] Страница "События" (Next)
- [x] Сервер с базовым CRUD на Node
- [x] Подготовить легко масштабируемый фундамент приложения
- [ ] Типизировать на TypeScript
- [ ] Миграция на Express
- [ ] Миграция на Prisma
- [ ] Настройка cache, cookie
- [ ] Сортировка и поиск по "Событиям"
- [ ] Авторизация
- [ ] Миграция на Nest
- [ ] Миграция на GrapQL
- [ ] Страница "Книги"
- [ ] Страница "Фильмы"
- [ ] Страница "План"
- [ ] Страница профиля
- [ ] Чат

<br>

### Инструкция по развёртыванию приложения:
1. Скачать проект
2. **npm i** // установить зависимости папке MyHistory
3. **sudo apt install postgresql postgresql-client** // установить СУБД postgresql
4. **sudo -u postgres psql** // войти в СУБД 
5. Инициализировать БД:  
     <details>
        <summary><ins>Инструкции</ins></summary>
        <br>
        **-- Изменить пароль**  
        ALTER USER postgres WITH PASSWORD 'root';  
        <br>
        ** -- Создать БД**  
        CREATE DATABASE my_history;  
         <br>
        **-- Подключится к БД**   
        \c my_history;    
           <br>
        **-- Создание таблиц **  
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
        <br>
    </details>
6. **npm run dev:back** // запустить сервер 
7. **npm run dev:front** // запустить клиент 
8. Открыть страницу **http://localhost:3000**
