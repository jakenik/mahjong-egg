const Service = require('egg').Service;

class OrderService extends Service {
  async getOrder(data = {}) {
    const db = await this.ctx.service.sql.db();
    const order = await db.select('order_statistics', {
      where: data
    });
    return order;
  }
}

module.exports = OrderService;
