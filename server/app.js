const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
import session from "koa2-cookie-session";

const homeIndex = require('./routes/home/index');
const userHome = require('./routes/user/home');
const userQuery = require('./routes/user/query');
const userSave = require('./routes/user/save');
const userUpdate = require('./routes/user/update');
const userRemove = require('./routes/user/remove');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// cors
app.use(cors({
    credentials: true
}));

// session信息
app.use(session({
    key: "KSESSION_ID",
    expires: 3,
    path: "/"
}));

// routes
app.use(homeIndex.routes(), homeIndex.allowedMethods());
app.use(userHome.routes(), userHome.allowedMethods());
app.use(userQuery.routes(), userQuery.allowedMethods());
app.use(userSave.routes(), userSave.allowedMethods());
app.use(userUpdate.routes(), userUpdate.allowedMethods());
app.use(userRemove.routes(), userRemove.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
