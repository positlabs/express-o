/*
    middleware for redirecting to https
    ignores localhost

    usage: 
        ssl(ENV !== local)
*/

module.exports = (redirect = true) => {
    if(redirect) {
        return (req, res, next) => {
            if(req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
                return res.redirect(`https://${req.hostname}`)
            }
        }
    }else {
        return (req, res, next) => { next() }
    }
}
