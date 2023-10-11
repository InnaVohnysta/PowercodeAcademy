import * as sass from 'sass';
import gulpSass from 'gulp-sass';

import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'//Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Выбод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добабление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групиробка медиа запросов


const sassnew = gulpSass(sass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: 'Error: <%= error.message %>'
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sassnew({
            outputeStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        // Раскомиентировать если нужен не сжатый дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());

        
}


