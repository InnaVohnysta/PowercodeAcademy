import replace from 'gulp-replace'; //Поиск и замена
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"// сообщение (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновления
import ifPlugin from "gulp-if"; // Условное ветвление

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}