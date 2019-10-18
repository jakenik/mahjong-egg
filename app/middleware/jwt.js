'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    const codeMsg = ctx.service.codeMsg;
    let authToken = ctx.header.token; // 获取header里的authorization
    if (authToken) {
      // authToken = authToken.substring(7);
      const res = verifyToken(authToken); // 解密获取的Token
      const userId = res.userId
      const isError = res.name === 'Error'
      if (userId) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const redis_token = await app.redis.get('loginToken')
          .get(userId); // 获取保存的token
        if (authToken === redis_token) {
          await next();
        } else {
          ctx.body = await codeMsg.getCodeMsg(10003);
        }
      } else if (isError){
        ctx.body = await codeMsg.getCodeMsg(10005);
      } else {
        ctx.body = await codeMsg.getCodeMsg(10004);
      }
    } else {
      ctx.body = await codeMsg.getCodeMsg(10002);
    }
  };
};

// 解密，验证
function verifyToken(token) {
  const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')); // 公钥，看后面生成方法
  let res = '';
  try {
    const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) res = result.data || {};
  } catch (e) {
    return e
  }
  return res;
}
