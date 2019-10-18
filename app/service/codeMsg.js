const Service = require('egg').Service;

class CodeMsgService extends Service {
  async getCodeMsg(code) {
    const db = await this.ctx.service.sql.db();
    let codeMsg = await db.get('code_error_msg', { code });
    if (!codeMsg) codeMsg = await db.get('code_error_msg', { code: 10001 });
    return {
      code: codeMsg.code,
      msg: codeMsg.msg,
      success: false
    };
  }
}

module.exports = CodeMsgService;
