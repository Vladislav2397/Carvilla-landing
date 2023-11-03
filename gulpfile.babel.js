import gulp from 'gulp'
import pug from 'gulp-pug'
import gulpClean from 'gulp-clean'
import prettyHtml from 'gulp-pretty-html'
import cleanHtml from 'gulp-htmlclean'
import gulpRename from 'gulp-rename'
import purgecss from 'gulp-purgecss'
import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'
import {stream as critical} from 'critical'

const tasks = {
    clean: 'clean',
    cleanPages: 'cleanPages',
    pages: 'pages',
    views: 'views',
    copy: 'copy',
    images: 'images',
    purgecss: 'purgecss',
    critical: 'critical'
}

gulp.task(tasks.critical, () => {
    return gulp
        .src("dist/*.html")
        .pipe(
            critical({
                base: "dist/",
                inline: true,
                css: [
                    "dist/assets/css/style.css",
                    "dist/assets/css/bootstrap.min.css",
                    "dist/assets/css/responsive.css"
                ],
            })
        )
        .on("error", (err) => {
            log.error(err.message);
        })
        .pipe(gulp.dest("dist"));
});


gulp.task(tasks.clean, () => {
    return gulp.src('dist', {
        allowEmpty: true
    })
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

gulp.task(tasks.purgecss, () => {
    return gulp.src('dist/**/*.css')
        .pipe(purgecss({
            content: ['dist/*.html']
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task(tasks.images, () => {
    return gulp.src('dist/assets/images/**/*')
        .pipe(webp())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
})

const common = gulp.series(tasks.clean, tasks.copy, tasks.views, tasks.cleanPages, tasks.images)
const build = gulp.series(common, tasks.critical) // , tasks.purgecss

export const dev = gulp.series(tasks.clean, common, tasks.pages)
export const prod = gulp.series(tasks.clean, build)

export default dev
