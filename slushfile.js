/*
 * slush-groupby-client
 * https://github.com/groupby/slush-client
 *
 * Copyright (c) 2017, GroupBy Inc.
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var yarn = require('gulp-yarn');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var path = require('path');

var defaults = (function () {
  var workingDirName = path.basename(process.cwd());
  var homeDir;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
  }

  var configFile = path.join(homeDir, '.gitconfig');
  var user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    serviceName: workingDirName.split('-')[0],
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
})();

gulp.task('default', function (done) {
  var prompts = [{
    name: 'serviceName',
    message: 'What is the name of your microservice?',
    default: defaults.serviceName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];
    // Ask
  inquirer.prompt(prompts)
    .then(function (answers) {
      if (!answers.moveon) {
        return done();
      }
      answers.serviceNameSlug = _.slugify(answers.serviceName);
      answers.serviceNameCamel = _.camelize(answers.serviceNameSlug);

      gulp.src(path.join(__dirname, 'templates', '**', '*'))
        .pipe(template(answers, { interpolate: /<%=([\s\S]+?)%>/g }))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
          if (file.basename[0] === '$') {
            file.basename = file.basename.slice(1);
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(yarn())
        .on('end', function () {
          done();
        });
    });
});
