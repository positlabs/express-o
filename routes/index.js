const express = require('express')
const router = express.Router()
const app = express()

router.get('/', (req, res, next) => {
	res.render('index', { 
		title: 'express-o',
		env: app.get('env')
	})
})

module.exports = router
