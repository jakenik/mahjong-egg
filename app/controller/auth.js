'use strict';

const Controller = require('egg').Controller;

class authController extends Controller {
  async getToken() { // 根据手机号获取token
    const { helper, service, app } = this.ctx;
    const data = this.ctx.request.body;
    const timeOut = 60;
    const {
      phone
    } = data;
    await helper.sendData({ phone: 'phone' }, async () => {
      if (!phone) return { errorMsg: '请填写手机号码' };
      if (!await service.auth.checkPhone(phone)) return { errorMsg: '您的手机未注册账号，请先注册！' };
      const userId = await service.auth.getUserId(phone);
      const token = await helper.createToken({
        phone,
        userId
      }, timeOut);
      await app.redis.get('loginToken')
        .set(userId, token, 'ex', timeOut);
      return {
        token
      };
    });
  }

  async registered() { // 用于注册账户
    const { helper, service } = this.ctx;
    const data = this.ctx.request.body;
    await helper.sendData({ account: 'account', password: 'password', phone: 'phone' }, async () => {
      const {
        account,
        password,
        phone
      } = data;

      if (await service.auth.checkPhone(phone)) {
        return { errorMsg: '手机号已经被注册了！' };
      } else if (await service.auth.checkAccount(account)) return { errorMsg: '该账户已经被注册！' };

      const db = await service.sql.db();
      const user_id = helper.getUUID();
      const createTime = helper.getTime('YYYY-MM-DD HH:mm:ss');
      const result = await db.insert('account_info', { account, password, create_time: createTime, phone, user_id });
      return { row: await result.affectedRows === 1 };
    });
  }
}

module.exports = authController;
