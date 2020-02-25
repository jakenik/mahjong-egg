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
      const customs_clearance = list[0].customs_clearance
      const list2 = await service.order.getOrder({
        customs_clearance
      });
      const invalid = list2.filter( item => item.negotiation_time === '' || !item.negotiation_time).length
      const ratio = invalid / list2.length * 100
      return {
        customs_clearance,
        ratio: ratio.toFixed(2)
      }
    });
  }
}

module.exports = OrderController;
