const request = require('request');
const fs = require('fs');
const conf = require('../config')

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
  ctx.DATA = await request({
    url: `${conf.api_url.API_CORE}/core/oss/list`,
    method: 'GET',
    qs: {name}
  });
  ctx.body = ctx.DATA;
};

/**
 * 单张图片上传
 */
const upload = async (ctx, next) => {
  const file = ctx.request.files.file
  ctx.DATA = await request({
    url: `${conf.api_url.API_CORE}/core/oss/upload`,
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
        }
      ]
    }
  })
  ctx.body = ctx.DATA
}

module.exports = {
  url,
  del,
  edit,
  add,
  list,
  upload,
};
