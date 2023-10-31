const { src, dest, series } = require('gulp')
const pug = require('gulp-pug')
const gulpClean = require('gulp-clean')
const prettyHtml = require('gulp-pretty-html')

function clean(done) {
    src('dist/**/*', {read: false})
        .pipe(gulpClean())
    done()
}

function pages() {
    return src('dist/*.html')
        .pipe(prettyHtml())
        .pipe(dest('dist'))
}

function views() {
  return src('./src/index.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest('./dist'))
}

const build = series(views)

const dev = series(clean, build, pages)
exports.dev = dev
exports.prod = series(clean, build)

exports.default = dev
