// eslint-disable-next-line strict
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const UUID = require('uuid');
module.exports = {
  getTime: format => moment()
    .format(format),
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
  getUUID: () => UUID.v1(),
  createToken(data, expires = 7200)
  {
    // 文档地址 https://github.com/auth0/node-jsonwebtoken
    const exp = Math.floor(Date.now() / 1000) + expires;
    const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')); // 私钥，看后面生成方法
    const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' });
    return token;
  },
  async sendData(data, fn) {
    const logger = this.ctx.logger;
    const type = data.validateType || 'post';
    const query = type === 'post'
      ? this.ctx.request.body
      : this.ctx.query;
    logger.info('当前请求参数', query);
    const errors = this.app.validator.validate(data, query);
    if (errors && errors.length) {
      this.ctx.body = {
        success: false,
        data: errors,
        msg: `${this.ctx.__(errors[0].field)}${this.ctx.__(errors[0].message)}`
      };
      logger.info(this.ctx.body);
      return;
    }
    try {
      await fn()
        .then(res => {
          this.ctx.body = {
            success: !res.errorMsg,
            data: res,
            msg: res.errorMsg
          };
          logger.info(this.ctx.body);
        })
        .catch(error => {
          this.ctx.logger.error(error);
          this.ctx.body = {
            success: false,
            data: null,
            error: error.stack,
          };
          logger.error(this.ctx.body);
        });
    } catch (e) {
      this.ctx.logger.error(e);
      this.ctx.body = {
        success: false,
        data: null,
        error: e.stack,
      };
      logger.error(this.ctx.body);
    }
  },
};
