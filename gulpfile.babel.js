const { src, dest, series } = require('gulp');
const pug = require('gulp-pug');

function clean(done) {
    done()
}

const prettyHtml = require('gulp-pretty-html');
 
function pages () {
    return src('dist/*.html')
        .pipe(prettyHtml())
        .pipe(dest('dist'));
}

function views() {
  return src('./src/index.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest('./dist'));
};

const build = series(views)

exports.default = series(clean, build, pages)
