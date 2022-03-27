const router = require('koa-router')()
const swaggerJsdoc = require('swagger-jsdoc')
const { join } = require('path')

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      description: '服务端',
      version: '1.0.0',
      title: '服务端'
    },
    host: '',
    basePath: '/',
    tags: [
      {
        name: 'server',
        description: 'auth'
      }
    ],
    schemes: ['http', 'https'],
    // components: {
    //   schemas: {
    //     Order: {
    //       type: 'object'
    //     }
    //   },
    //   securitySchemes: {
    //     BasicAuth: { type: 'http', scheme: 'basic' }
    //   }
    // }
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [join(__dirname, '../controllers/*.js')]
}
const openapiSpecification = swaggerJsdoc(options)
// 数据校验
const parameter = require('../utils/parameter')
// token校验
const { checkToken } = require('../utils/tool/token')
// 验证码校验
const { checkCode } = require('../utils/tool/verification')

const { get, post } = require('../controllers/test')
const { info, login, register } = require('../controllers/login')
const { url, del, edit, add, list, upload } = require('../controllers/file')
const { code } = require('../controllers/verification')
const { index } = require('../controllers/index')
const { fzf } = require('../controllers/fzf')

// test
router.get('/yun1/test/get', get)
router.post('/yun1/test/post', post)
// login
router.get('/yun1/login/info', checkToken, info)
router.post('/yun1/login/login', checkCode, parameter, login)
router.post('/yun1/login/register', checkCode, parameter, register)
// file
router.get('/yun1/file/url', checkToken, url)
router.post('/yun1/file/del', checkToken, del)
router.post('/yun1/file/edit', checkToken, edit)
router.post('/yun1/file/add', checkToken, add)
router.get('/yun1/file/list', list)
router.post('/yun1/file/upload', checkToken, upload)
// verification
router.get('/yun1/verification/code', parameter, code)
// swagger
router.get('/yun1/api/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = openapiSpecification
})
// index
router.get('/', index)
// fzf
router.get('*', fzf)

module.exports = router
