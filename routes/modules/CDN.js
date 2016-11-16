var CDN = '/'
if(process.env.NODE_ENV !== 'local'){ 
	CDN = 'https://storage.googleapis.com/express-o/'
}

module.exports = CDN