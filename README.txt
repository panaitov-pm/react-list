Задание: 

Развернуть react приложение.

Настроить линтинг.

С помощью Google Material UI создать менюшку с двумя ссылками которые отображают через реакт роутинг два созданых компонента (или первый или второй) текущщая ссылка должна быть подсвечена.

Первый компонент: 
Форма из двух полей	Name и Email и Кнопка "Сохранить".
Кнопка "Сохранить" должна быть со стейтом Disabled если поля пустые.
По нажатию "Сохранить" поля формы должны быть сохранены методом Redux.
Вернувшись со второй страницы поля формы должны отобразить из Redux введённые ранее данные

Второй компонент: 
Компонент состоит из кнопки "Загрузить" и компонента Таблицы MUI.
Предварительно подготовить json файл c простыми данными на несколько колонок таблицы и загрузить на любой сервер.
По кнопке "Загрузить" методом fetch подгрузить данные используя Redux и отобразить в компоненте таблицы.
Используя опции компонента таблицы актививровать multi-selectable режим.
При переходе на первый компонент данные должны быть очищены.
В момент подгрузки кнопка должна быть со стейтом Disabled.

Создать конечный билд приложения.