const concat = require('gulp-concat')
const del = require('del')
const gulp = require('gulp')
const minifyCSS = require('gulp-minify-css')
const sass = require('gulp-sass')

const config = {
  css: [
    'src/assets/**/*.scss',
    'src/assets/**/*.css'
  ]
}

gulp.task('clean-css', () => del(['src/app/dist/**/*.min.css']))

gulp.task('css', ['clean-css'], () => {
  return gulp.src(config.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('src/dist'))
})

gulp.task('watch-css', ['css'], () => gulp.watch(config.css, ['css']))
