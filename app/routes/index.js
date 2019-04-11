const router = require('koa-router')();

// 数据校验
const parameter = require('../utils/parameter');
// token校验
const {checkToken} = require('../utils/tool/token');
// 验证码校验
const {checkCode} = require('../utils/tool/verification');

const {get, post} = require('../controllers/test');
const {info, login, register} = require('../controllers/login');
const {url, del, edit, add, list, upload} = require('../controllers/file');
const {code} = require('../controllers/verification');
const {index} = require('../controllers/index');
const {fzf} = require('../controllers/fzf');

// test
router.get('/yun/test/get', get);
router.post('/yun/test/post', post);
// login
router.get('/yun/login/info', checkToken, info);
router.post('/yun/login/login', checkCode, parameter, login);
router.post('/yun/login/register', checkCode, parameter, register);
// file
router.get('/yun/file/url', checkToken, url);
router.post('/yun/file/del', checkToken, del);
router.post('/yun/file/edit', checkToken, edit);
router.post('/yun/file/add', checkToken, add);
router.get('/yun/file/list', checkToken, list);
router.post('/yun/file/upload', checkToken, upload);
// verification
router.get('/yun/verification/code', parameter, code);
// index
router.get('/', index);
// fzf
router.get('*', fzf);

module.exports = router;
