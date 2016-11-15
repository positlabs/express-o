const express = require('express')
const router = express.Router()
const app = express()
const pkg = require('../package.json')

var ENV = app.get('env')
var CDN = '/' // use site root for local development
if(ENV !== 'local') CDN = '/' // TODO: point to your CDN!

router.get('/', (req, res, next) => {
	res.render('index', { 
		title: pkg.name,
		version: pkg.version,
		ENV,
		CDN
	})
})

module.exports = router
