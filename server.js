const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve   = require('koa-static');
const send    = require('koa-send');
const axios = require('axios');


const app = new Koa();

const BASE_URL = 'http://192.168.4.239:8080';

const apiCall = (reqObj, api) => {
  const { method, headers, query, body } = reqObj;
  console.log(BASE_URL, api);
  console.log(body, query, method);
  return method === 'POST' 
    ? axios[method.toLowerCase()](`${BASE_URL}${api}`, {...body}, { headers }) : axios[method.toLowerCase()](`${BASE_URL}${api}`, { headers, params: query })
}

app.use(cors({origin: '*'}))
app.use(bodyParser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));
app.use(serve(__dirname + '/dist/'));
// app.use( ctx => {
//   send(__dirname + '/dist/index.html');
// });

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  await apiCall(ctx.request, ctx.url).then(res => {
    ctx.body = res.data;
  }).catch(err => {
    console.log(err.response.data);
    ctx.throw(Number(err.response.data.error_code), 'Error', err.response.data.message);
  })
});

app.on('error', err => {
  console.log('server error', err)
});

app.listen(8080);