const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const sassFiles = [
    "./src/scss/variables.scss",
    "./src/scss/custom.scss",
    "./node_modules/bootstrap/scss/_variables.scss"
];

const vendorJsFiles = [
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task('sass', function (done) {
    gulp
        .src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(
            autoPrefix({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./public/css/"));
    done();
});

gulp.task('js:vendor', function (done) {
    gulp
        .src(vendorJsFiles)
        .pipe(concatenate("vendor.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js/"));
    done();
});

gulp.task('image', function (done) {
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
    done();
});

gulp.task("build", gulp.parallel(["sass", "js:vendor", "image"]));

gulp.task('watch', function (done) {
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
    done();
});


gulp.task('default', gulp.series('build'));