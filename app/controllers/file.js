const rp = require('request-promise');
const fs = require('fs');

const url = async (ctx, next) => {
  ctx.DATA.message = '禁止操作';
  ctx.DATA.code = 1;
  ctx.body = ctx.DATA;
};

const del = async (ctx, next) => {
  ctx.DATA.message = '禁止操作';
  ctx.DATA.code = 1;
  ctx.body = ctx.DATA;
};

const edit = async (ctx, next) => {
  ctx.DATA.message = '禁止操作';
  ctx.DATA.code = 1;
  ctx.body = ctx.DATA;
};

const add = async (ctx, next) => {
  ctx.DATA.message = '禁止操作';
  ctx.DATA.code = 1;
  ctx.body = ctx.DATA;
};

/**
 * 列表
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const list = async (ctx, next) => {
  const name = ctx.query.name;
  let options = {
    url: 'http://0.0.0.0:3005/core/oss/list',
    method: 'GET',
    qs: {name: name}
  };
  let dat = await rp(options);
  let res = JSON.parse(dat);
  delete res.data.res;
  ctx.DATA = res;
  ctx.body = ctx.DATA;
};

/**
 * 单张图片上传
 */
const upload = async (ctx, next) => {
  const file = ctx.request.files.file;
  let options = {
    url: 'http://0.0.0.0:3005/core/oss/upload',
    method: 'POST',
    formData: {
      file: [
        {
          value: fs.createReadStream(file.path),
          options: {
            filename: file.name,
            contentType: file.mimeType
          }
        },
        {
          value: fs.createReadStream(file.path),
          options: {
            filename: file.name,
            contentType: file.mimeType
          }
        },
      ]
    }
  };
  let dat = await rp(options);
  let res = JSON.parse(dat);
  delete res.data.res;
  ctx.DATA = res;
  ctx.body = ctx.DATA;
};

module.exports = {
  url,
  del,
  edit,
  add,
  list,
  upload,
};
