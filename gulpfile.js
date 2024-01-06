// require de gulp, sass y plumber
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// tarea para compilar sass
gulp.task('sass', () => {
    return gulp
        .src('public/sass/**/*.scss')
        .pipe(plumber(
            function (err) {
                console.log('Error de sass');
                console.log(err);
                this.emit('end');
            }
        ))
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});


// tarea para vigilar cambios
gulp.task('watch', () => {
    gulp.watch('public/sass/**/*.scss', gulp.series('sass'));
});

// tarea por defecto
gulp.task('default', gulp.series('sass', 'watch'));