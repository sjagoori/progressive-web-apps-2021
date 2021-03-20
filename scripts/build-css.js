const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

return (
  gulp
    .src(["./static/css/detailpage.css"])
    .pipe(concat("detailpage.css"))
    .pipe(cleanCSS())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/css")),
  gulp
    .src(["./static/css/homepage.css"])
    .pipe(concat("homepage.css"))
    .pipe(cleanCSS())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/css"))
);
