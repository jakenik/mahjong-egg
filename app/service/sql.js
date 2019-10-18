const Service = require('egg').Service;

class SqlService extends Service {
  async db(data = {}) {
    const {
      dbName = 'db'
    } = data
    return await this.ctx.app.mysql.get(dbName)
  }
}

module.exports = SqlService;
