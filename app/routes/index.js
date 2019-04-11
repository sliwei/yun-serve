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
router.get('/yun1/test/get', get);
router.post('/yun1/test/post', post);
// login
router.get('/yun1/login/info', checkToken, info);
router.post('/yun1/login/login', checkCode, parameter, login);
router.post('/yun1/login/register', checkCode, parameter, register);
// file
router.get('/yun1/file/url', checkToken, url);
router.post('/yun1/file/del', checkToken, del);
router.post('/yun1/file/edit', checkToken, edit);
router.post('/yun1/file/add', checkToken, add);
router.get('/yun1/file/list', checkToken, list);
router.post('/yun1/file/upload', checkToken, upload);
// verification
router.get('/yun1/verification/code', parameter, code);
// index
router.get('/', index);
// fzf
router.get('*', fzf);

module.exports = router;
