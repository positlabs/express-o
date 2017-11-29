const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const shrinkRay = require('shrink-ray')
const fs = require('fs')
const CDN = require('./routes/modules/cdn')
const scssInjector = require('inject-scss')
const os = require('os')

// https://github.com/sass/node-sass-middleware
const sass = require('node-sass-middleware')

// https://github.com/ForbesLindesay/browserify-middleware
const browserify = require('browserify-middleware')

const routes = require('./routes/index')
const app = express()
const ENV = app.get('env')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// brotli doesn't work on windows
if(os.platform !== 'win32'){
	app.use(shrinkRay())
}

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser())

scssInjector(path.join(__dirname, 'public/styles/_inject.scss'), {CDN})

app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false,
	outputStyle: 'compressed',
	sourceMap: app.get('env') !== 'production',
	debug: app.get('env') !== 'production'
}))

// no need to transform libs. takes too long
app.use('/js/globals.js', browserify( path.join(__dirname, 'public/js/globals.js'), {
	cache: true,
	precompile: true,
	minify: true
}))

app.use('/js', 
	browserify( path.join(__dirname, 'public/js'), { 
		precompile: ENV !== 'local',
		minify: ENV !== 'local',
		cache: ENV !== 'local',
		debug: ENV === 'local',
		transform: [
			['envify', {NODE_ENV: ENV}]
			['babelify', {
				presets: [['env', {
					targets: {
						// https://github.com/ai/browserslist
						browsers: ['last 2 versions', 'not ie < 11']
					}
				}]]
			}]
		]
	}),
	(req, res, err) => { 
		console.error('Browserify error! ' + err)
		err.status = 500
		next(err)
	}
)

app.use(express.static( path.join(__dirname, 'public') ))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'local'){
		
	// notify dev of errors in a notification
	const notifier = require('node-notifier')
	app.use((err, req, res, next) => {
		notifier.notify({
			'title': 'Error',
			'message': err.message
		})
		return next(err)
	})

	const livereload = require('livereload')
	const server = livereload.createServer({exts: ['scss']})
	server.watch(__dirname + '/public/styles')

	// notify dev of errors in console, and send to client
	app.use((err, req, res, next) => {
		console.error(err, req.path)
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	console.error(err)
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {}
	})
})

module.exports = app
