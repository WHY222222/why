const express = require('express');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('./server/config/default.js');
const pkg = require('./package');
const routes = require('./server/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

//session中间件
app.use(session({
	name: config.session.key, //设置cookie中保存session id的字段名称
	secret: config.session.secret, //通过设置secret来计算 hash 值并放在cookie中，使产生的signedCookie防篡改
	resave: true, //强制更新session
	saveUninitialized: false, //设置为false，强制创建一个session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge//过期时间，过期后cookie中的session id自动删除
	},
	store: new MongoStore({ //将session 存储到mongodb
		url: config.mongodb //Mongodb地址
	})
}))

//flash 中间件，用来显示通知
app.use(flash())

routes(app);//路由放到处理表单上方，否则多个请求会报错

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'static/img')));

// app.use(require('express-formidable')({
// 	uploadDir: path.join(__dirname, 'static/img'),//上传文件目录
// 	keepExtensions: true//保留后缀
// }))

app.get('/', function(req, res){
	res.send('index')
})


//Websocket连接监听
// io.on('connection', function(socket) {
// 	console.log('a user connected');
// 	//socket.emit('open');//通知客户端已连接
// 	//打印握手信息
// 	//console.log(socket.handshake);
//
// 	//构造客户端对象
// 	let client = {
// 		socket: socket,
// 		name: false,
// 		color: '#000'
// 	}
// })




http.listen(config.port, function (){
	console.log(`${pkg.name} listening on port ${config.port}`)
});

module.exports = {
	http: http
}
