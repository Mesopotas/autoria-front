var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('compilar-sass', function(done) {
    gulp.src('source/main.scss')  // Direccion del SCSS, el que nosotros usamos
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css')); // Direccion del CSS, donde se va a unificar la informacion
    done();
});


gulp.task( 'watch', function() {
    gulp.watch( [
        'source/*/*.scss'
        , 'source/*.scss'], gulp.series('compilar-sass') );
});


//sass source/main.scss build/css/main.css

//gulp watch

//gulp compilar-sass