const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const serve = require("koa-static");
const mount = require("koa-mount");
const http  = require('http')
const routes = require('./src/routes')

const app = new Koa()
  .use(cors())
  .use(logger())
  .use(bodyParser())

//These are the new change
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/dist")); //serve the build directory

app.use(mount("/", static_pages));
app.use(require('koa-static')(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.listen(process.env.PORT, () => {
  console.log(`${'[SYS]'.rainbow} server started at port ${process.env.PORT}`);
});

const server = http.createServer(app.callback())
// app.use(function *(){  
//   this.body = 'Hello from koajs';
// });
const temp = server.listen(process.env.PORT || 8080);

module.exports = temp;
