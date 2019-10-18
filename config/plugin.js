'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  'io': {
    'enable': true,
    'package': 'egg-socket.io',
  },
  'redis': {
    'enable': true,
    'package': 'egg-redis'
  },
  'mysql': {
    'enable': true,
    'package': 'egg-mysql',
  },
  'cors': {
    'enable': true,
    'package': 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  }
}
;
