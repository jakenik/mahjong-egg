'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async pong() {
    const message = this.ctx.args[0];
    this.ctx.logger.info(message)
    await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
  async getUser() {
    const msg = this.ctx.args[0]
    await this.logeer.info(msg)
  }
}

module.exports = HomeController;
