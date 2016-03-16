var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var argv = require('yargs').argv;
var conf = require('./conf');


//yargs syntax: gulp serve --env=production
gulp.task('configuration', function () {
  var envConfig = require('../config.json');
  var environment = argv.env || 'dev';
  console.log("ENVIRONMENT: " + environment);
  return ngConstant({
  	name: 'zippr.config',
    constants: envConfig[environment],
    stream: true
    })
    .pipe(gulp.dest(conf.paths.src+'/app/'));
});