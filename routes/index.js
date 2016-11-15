const express = require('express')
const router = express.Router()
const app = express()

var ENV = app.get('env')
var CDN = '/'
if(ENV !== 'local') CDN = '/' // TODO: point to your CDN!

router.get('/', (req, res, next) => {
	res.render('index', { 
		title: 'express-o',
		ENV,
		CDN
	})
})

module.exports = router
