'use strict';

module.exports = app => {
  const rule = require('./app/public/rule.js')
  rule.forEach(({ name, fn }) => {
    app.validator.addRule(name, fn);
  });
};
