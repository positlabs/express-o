const express = require('express')
const router = express.Router()
const app = express()
const pkg = require('../package.json')
const CDN = require('./modules/CDN')

var ENV = app.get('env')

router.get('/', (req, res, next) => {
	res.render('index', { 
		title: pkg.name,
		version: pkg.version,
		ENV,
		CDN
	})
})

module.exports = router
