const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// https://github.com/sass/node-sass-middleware
const sass = require('node-sass-middleware')
// const postcssMiddleware = require('postcss-middleware')
// const autoprefixer = require('autoprefixer')

// https://github.com/ForbesLindesay/browserify-middleware
const browserify = require('browserify-middleware')

const routes = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser())

app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true,
	outputStyle: 'compressed',
	sourceMap: app.get('env') !== 'production',
	debug: app.get('env') !== 'production'
}))

// autoprefixer
// app.use('/styles/', postcssMiddleware({
// 	plugins: [
// 		autoprefixer({
// 			browsers: ['last 2 versions']
// 		})
// 	],
// 	src: function(req) {
// 		console.log('||||||||||||||||||', req.url, path.parse(req.url).ext, path.parse(req.url).ext.match('.css') !== null)
// 		if(path.parse(req.url).ext.match('.css') !== null) return []
// 		return path.join(path.join(__dirname, 'public/styles/'), req.url);
// 	}
// }))

browserify.settings({
	transform: [
		// 'jadeify', // client-side jade template functions
		['babelify', {presets: ['es2015']}] // compile client-side js as es6
	]
})
app.use('/js', (req, res) => { 
	browserify( path.join(__dirname, 'public/js'), { cache: true, precompile: true })(req, res, err => { 
		console.error('Browserify error! ' + err)
		err.status = 500
		next(err)
	})
})

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
if (app.get('env') !== 'production') {

	const livereload = require('express-livereload')

	// notify dev of errors in a notification
	if(app.get('env') === 'local'){
		const notifier = require('node-notifier')
		app.use((err, req, res, next) => {
			notifier.notify({
				'title': 'Error',
				'message': err.message
			})
			return next(err)
		})
	}

	// notify dev of errors in console, and send to client
	app.use((err, req, res, next) => {
		console.error(err.message)
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err
		})
	})

	// hotswap styles
	livereload(app, {
		watchDir: __dirname + '/public/styles/',
		exts: ['css'], // only watch css
		exclusions: ['map', 'scss', 'sass'] // exclude scss and map because it will refresh the whole page
	})

	const chokidar = require('chokidar')
	const request = require('request')
	const styleWatcher = chokidar.watch(__dirname + '/public/styles/**/*.s*ss')
	styleWatcher.on('change', filepath => {
		// infer path so this will work with any css file
		var localhostPath = filepath.split('public/')[1].split('.')[0] + '.css'
		localhostPath = `http://localhost:${app.get('port')}/${localhostPath}`
		console.log('CHANGED STYLE:', localhostPath)
		
		// grab the css to trigger livereload
		request(localhostPath, (err, response) => {
		// request('http://localhost:3000/styles/style.css', (err, response) => {
			// console.log(err, response)
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {}
	})
})


module.exports = app
