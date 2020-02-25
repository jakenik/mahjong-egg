/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569649534802_9422';

  // add your middleware config here
  // config.middleware = ['jwt'];

  // config.jwt = {
  //   enable: true,
  //   ignore: ['/auth/registered', '/auth/getToken', '/getOrder'], // 哪些请求不需要认证
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // config.io = {
  //   init: {}, // passed to engine.io
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: ['auth'],
  //       packetMiddleware: [],
  //     },
  //   },
  //   redis: {
  //     host: '127.0.0.1',
  //     port: 6379, db: 0
  //   }
  // };

  config.redis = {
    clients: {
      loginToken: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      }
    }
  };
  config.mysql = {
    // 单数据库信息配置
    clients: {
      db: {
        // host
        'host': '121.199.13.2',
        // 端口号
        'port': '3306',
        // 用户名
        'user': 'root',
        // 密码
        'password': '111022',
        // 数据库名
        'database': 'db',
      }
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.security = {
    csrf: {
      enable: true,
      ignore: ['/auth/registered', '/auth/getToken', '/getOrder']
    }
  };
  config.i18n = {
    defaultLocale: 'zh-CN',
  };
  config.cors = {
    origin: 'http://127.0.0.1:8080', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  return {
    ...config,
    ...userConfig
  };
};
