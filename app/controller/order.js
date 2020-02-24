'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async getOrder() {
    const { helper, service } = this.ctx;
    const data = this.ctx.request.body;
    await helper.sendData({
      code: 'string'
    }, async () => {
      const list = await service.order.getOrder(data);
      if(!list[0]) return {
        customs_clearance: '无',
        ratio: '无'
      }
      const fn = (n) => Math.floor(n * 100) / 100
      const invalid = list.filter( item => item.negotiation_time === '' || !item.negotiation_time).length
      const ratio = fn(invalid / list.length)
      return {
        customs_clearance: list[0].customs_clearance,
        ratio
      }
    });
  }
}

module.exports = OrderController;
