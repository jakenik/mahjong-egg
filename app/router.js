'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/index', controller.home.index);
  router.post('/auth/getToken', controller.auth.getToken);
  router.post('/auth/registered', controller.auth.registered);

  io.of('/').route('pong', io.controller.home.pong);
  io.of('/').route('getUser', io.controller.home.getUser);
};
