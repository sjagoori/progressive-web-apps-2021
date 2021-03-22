const gulp = require('gulp')

moveAssets()

function moveAssets() {
  gulp.src([
    './static/images/*',
  ])
    .pipe(gulp.dest('./dist/images/'))

  gulp.src([
    './static/*.json',
    './static/*.js',
  ])
    .pipe(gulp.dest('./dist/'))

  gulp.src([
    './static/scripts/*.js'
  ])
    .pipe(gulp.dest('./dist/scripts'))
  return

}
