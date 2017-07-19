const concat = require('gulp-concat')
const del = require('del')
const gulp = require('gulp')
const minifyCSS = require('gulp-minify-css')
const sass = require('gulp-sass')

const config = {
  // Our stylesheet sources exist in the `./assets` folder
  css: [
    // include SASS files
    'src/assets/**/*.scss',
    // Also include CSS files
    'src/assets/**/*.css'
  ]
}

// Define output for compiled StyleSheets
config.css.output = 'src/dist'

// This task deletes existing compiled stylesheets
gulp.task('clean-css', () => del(['src/app/dist/**/*.min.css']))

// This task compiles and minifies our StyleSheets
gulp.task('css', ['clean-css'], () => {
  return gulp.src(config.css)
    // Compile SASS source
    .pipe(sass().on('error', sass.logError))
    // Concat compiled sources into a single StyleSheet
    .pipe(concat('styles.min.css'))
    // Minify the final StyleSheet
    .pipe(minifyCSS())
    // Write to the desired destination
    .pipe(gulp.dest(config.css.output))
})

// This task watches for changes to StyleSheets, and runs `css`
gulp.task('watch-css', ['css'], () => gulp.watch(config.css, ['css']))
