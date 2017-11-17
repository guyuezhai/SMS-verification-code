const Koa = require('koa');
let bodyParser = require('koa-bodyparser');

const config = require('./config');

const captcha = require('./routes/captcha');

let app = new Koa();

app.use(bodyParser({
	jsonLimit: '1mb',
    formLimit: '1mb'
}));

app.use( captcha.routes(), captcha.allowedMethods() );

let port = config.port;

app.listen(port,function(){
    console.log('GeoHey Captcha Service is running on port ' + port);
});