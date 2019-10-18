// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth = require('../../../app/service/auth');
import ExportCodeMsg = require('../../../app/service/codeMsg');
import ExportSql = require('../../../app/service/sql');

declare module 'egg' {
  interface IService {
    auth: ExportAuth;
    codeMsg: ExportCodeMsg;
    sql: ExportSql;
  }
}
