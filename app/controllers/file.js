const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')
const conf = require('../config')

const url = async (ctx, next) => {
  ctx.DATA.message = '禁止操作'
  ctx.DATA.code = 1
  ctx.body = ctx.DATA
}

const del = async (ctx, next) => {
  ctx.DATA.message = '禁止操作'
  ctx.DATA.code = 1
  ctx.body = ctx.DATA
}

const edit = async (ctx, next) => {
  ctx.DATA.message = '禁止操作'
  ctx.DATA.code = 1
  ctx.body = ctx.DATA
}

const add = async (ctx, next) => {
  ctx.DATA.message = '禁止操作'
  ctx.DATA.code = 1
  ctx.body = ctx.DATA
}

/**
 * 列表
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const list = async (ctx, next) => {
  const name = ctx.query.name
  const response = await fetch(
    `${conf.api_url.API_CORE}/core/oss/list?name=${name}`
  )
  ctx.DATA = await response.json()
  ctx.body = ctx.DATA
}

/**
 * @swagger
 * /yun1/file/upload:
 *   post:
 *     tags:
 *       - server
 *     summary: 图片
 *     description: 说明
 *     requestBody:
 *       description: Pet object that needs to be added to the store
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 文件
 *     responses:
 *       '200':
 *         description: 成功说明
 *       '400':
 *         description: 失败说明
 */
const upload = async (ctx, next) => {
  const file = ctx.request.files.file
  let formData = new FormData()
  formData.append('file', fs.createReadStream(file.path), {
    filename: file.name //上传的文件名
    // contentType: 'image/png',//文件类型标识
  })
  const response = await fetch(`${conf.api_url.API_CORE}/core/oss/upload`, {
    body: formData,
    method: 'POST', //请求方式
    headers: formData.getHeaders()
  })
  const res = await response.json()
  ctx.DATA.data = res.data
  ctx.body = ctx.DATA
}

module.exports = {
  url,
  del,
  edit,
  add,
  list,
  upload
}
