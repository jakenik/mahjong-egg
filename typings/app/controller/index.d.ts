// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth = require('../../../app/controller/auth');
import ExportHome = require('../../../app/controller/home');
import ExportOrder = require('../../../app/controller/order');

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    home: ExportHome;
    order: ExportOrder;
  }
}
