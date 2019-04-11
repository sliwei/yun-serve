/**
 * lw 配置文件
 */
const db = require('./mysql');

module.exports = {
  port: 3008, // 端口
  db: db, // 数据库
  tokenObs: 'yun-serve', // token混淆码
  verificationObs: 'yun-serve', // 验证码混淆码
  verificationSta: true, // 启用验证码
  cookieOptions: {
    maxAge: 1000 * 3600 * 48,
    path: '/',
    httpOnly: false
  },
};
