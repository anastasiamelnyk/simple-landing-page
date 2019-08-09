const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require ('gulp-plumber');
const postCSS = require('gulp-postcss');
const autopref = require('autoprefixer');
const postcssNorm = require('postcss-normalize');
const maps = require('gulp-sourcemaps');
const minCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sync = require('browser-sync');
const babel = require('gulp-babel');
const jsMinBabel = require('gulp-babel-minify');
const img = require('gulp-imagemin');
const webp = require('gulp-webp');
const minHtml = require('gulp-htmlmin');
const clean = require('del');


//style task
gulp.task('style', () => {
  return gulp.src('src/style/style.scss')
  .pipe(plumber())
  .pipe(maps.init())
  .pipe(sass())
  .pipe(postCSS([
    autopref(),
    postcssNorm()
  ]))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('prod/style'))
  .pipe(minCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('prod/style'))
  .pipe(sync.reload({stream:true}));
});

gulp.task('jsMin', () => {
  return gulp.src('src/js/script.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('prod/js'))
  .pipe(jsMinBabel())
  .pipe(rename('script.min.js'))
  .pipe(gulp.dest('prod/js'));
});


//image tasks
gulp.task('minImg', () => {
  return gulp.src('src/images/*.{png,jpg,svg}')
  .pipe(img([
    img.optipng({optimizationLevel: 3}),
    img.jpegtran({progressive: true}),
    img.svgo({
        plugins: [
            {removeViewBox: false}
        ]
    })
    ]))
  .pipe(gulp.dest('prod/images'));
});

gulp.task('webp', () => {
  return gulp.src('prod/images/*.{png,jpg}')
  .pipe(webp({quality: 90,}))
  .pipe(gulp.dest('prod/images'));
});

gulp.task('images', gulp.series('minImg', 'webp'));


//html task
gulp.task('html', () => {
  return gulp.src('src/index.html')
  .pipe(minHtml(
    { collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true
    }))
  .pipe(gulp.dest('prod'));
});


//build tasks
gulp.task('cleanProd', () => {
  return clean('prod');
});

gulp.task('copy', () => {
  return gulp.src(['src/fonts/**', 'src/js/modernizr-webp.js', 'src/js/picturefill.min.js'], { base: 'src' })
  .pipe(gulp.dest('prod'));
});

gulp.task('prod', gulp.series(
  'cleanProd', gulp.parallel(
    'copy',
    'style',
    'jsMin',
    'images',
    'html')));


//live watching
gulp.task('default', gulp.series('prod', () => {
  sync.init({
    server: 'prod'
  });
  gulp.watch('src/style/**/*.scss', gulp.series('style'));
  gulp.watch('src/index.html', gulp.series('html'));
  gulp.watch('src/js/**.js', gulp.series('jsMin'));
}));
