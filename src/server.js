// const Koa = require('koa');
// const logger = require('koa-logger');
// const cors = require('kcors');
// const bodyParser = require('koa-bodyparser');
// const serve = require("koa-static");
// const mount = require("koa-mount");
// const http  = require('http');
// const router = require('koa-router');
// const path = require('path');
// const koaSend = require('koa-send');
// const Routes = require('./routes');
// const combineRouters = require('koa-combine-routers');
// const test = combineRouters(Routes);
// // const routes = new router();
// // routes.get('*', (req, res) => {
// //   koaSend(req, '/src/index.html')
// //   //res.sendFile(path.resolve(__dirname, 'src/index.html'));
// // });

// const static_pages = new Koa();
// static_pages.use(serve(__dirname + "/dist")); //serve the build directory

// const app = new Koa()
//   .use(cors())
//   .use(logger())
//   .use(bodyParser())
//   .use(test)
// //  .use(routes.allowedMethods())
//   .use(mount("/", static_pages))
//   .use(require('koa-static')(__dirname + '/dist'));

// // app.listen(process.env.PORT || 8080, () => {
// //   console.log(`${'[SYS]'.rainbow} server started at port ${process.env.PORT}`);
// // });

// const server = http.createServer(app.callback())
// // app.use(function *(){  
// //   this.body = 'Hello from koajs';
// // });
// const temp = server.listen(process.env.PORT || 8080);

// module.exports = temp;
