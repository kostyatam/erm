var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var base64 = require('gulp-base64');

gulp.task('sass', function () {
    return gulp.src('./src/scss/*scss')
        .pipe(base64({
            baseDir: 'src/img',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            maxImageSize: 8*1024, // bytes,
            debug: true
        }))
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

gulp.task('html', function () {
    return gulp
        .src('./src/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('img', function () {
    return gulp
        .src('./src/img/**')
        .pipe(gulp.dest('./build/img'));
})
    
gulp.task('watch', function () {
    gulp.watch('./src/scss/*scss', ['sass']);
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/img/**', ['img']);

});

gulp.task('dev', ['watch', 'sass', 'html', 'img']);