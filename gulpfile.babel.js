const gulp = require('gulp')
const pug = require('gulp-pug')
const gulpClean = require('gulp-clean')
const prettyHtml = require('gulp-pretty-html')
const cleanHtml = require('gulp-htmlclean')
const gulpRename = require('gulp-rename')

const tasks = {
    clean: 'clean',
    cleanPages: 'cleanPages',
    pages: 'pages',
    views: 'views',
    copy: 'copy',
    purgecss: 'purgecss',
}

gulp.task(tasks.clean, () => {
    return gulp.src('dist/**', {read: false})
        .pipe(gulpClean())
})

gulp.task(tasks.cleanPages, () => {
    return gulp.src('dist/*.html')
        .pipe(cleanHtml())
        .pipe(gulp.dest('dist'))
})

gulp.task(tasks.pages, () => {
    return gulp.src('dist/*.html')
        .pipe(prettyHtml())
        .pipe(gulp.dest('dist'))
})

gulp.task(tasks.copy, () => {
    return gulp.src('./src/assets/**/*').pipe(gulp.dest('dist/assets'))
})

// gulp.task('purgecss', () => {
//     return gulp.src('src/**/*.css')
//         .pipe(purgecss({
//             content: ['src/**/*.html']
//         }))
//         .pipe(gulp.dest('build/css'))
// })

gulp.task(tasks.views, () => {
    return gulp.src("./src/pages/*.page.pug")
        .pipe(
            pug({
                // Your options in here.
            })
        )
        .pipe(gulpRename((path) => {
            console.log('path with name', `${path.dirname}/${path.basename}${path.extname}`)

            path.basename = path.basename.replace('.page', '')

            console.log('was renamed to', `${path.dirname}/${path.basename}${path.extname}`)
        }))
        .pipe(gulp.dest("./dist"))
})

const purgecss = require('gulp-purgecss')

gulp.task(tasks.purgecss, () => {
    return gulp.src('dist/**/*.css')
        .pipe(purgecss({
            content: ['dist/*.html']
        }))
        .pipe(gulp.dest('dist'))
})

const common = gulp.series(tasks.views, tasks.copy, tasks.cleanPages)
const build = gulp.series(common) // , tasks.purgecss

const dev = gulp.series(tasks.clean, common, tasks.pages)
exports.dev = dev
exports.prod = gulp.series(tasks.clean, build)

exports.default = dev
