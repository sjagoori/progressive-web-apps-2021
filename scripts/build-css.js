const gulp = require('gulp')
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

return gulp.src([
  './public/css/main.css'
])
.pipe(concat('main.css'))
.pipe(cleanCSS())
.pipe(autoprefixer({
  cascade: false
}))
.pipe(gulp.dest('./dist/css'))