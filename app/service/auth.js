const Service = require('egg').Service;

class AuthService extends Service {
  async getInfo(data = {}) {
    const db = await this.ctx.service.sql.db();
    const getPhone = await db.get('account_info', data);
    return getPhone;
  }

  async checkPhone(phone) {
    const info = await this.getInfo({ phone });
    return info
      ? info.phone
      : false;
  }

  async getUserId({account, password}) {
    const info = await this.getInfo({account, password});
    return info
      ? info.user_id
      : false;
  }

  async checkAccount(account) {
    const info = await this.getInfo({ account });
    return info
      ? info.account
      : false;
  }
}

module.exports = AuthService;
