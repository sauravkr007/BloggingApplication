const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


// is authenticated middleware 
const isAuthenticated = async (req, res, next) => {
    try {
        let token;
        if (token = await jwt.verify(req.cookies["AUTH"], SECRET)) {
            req.app.locals.uid = token.id
            req.app.locals.name = token.name
            req.app.locals.isAdmin = token.isAdmin || false
            next();
        } else {
            res.json({ result: false })
        }
    } catch (e) {
        res.json({ result: false })
    }
}

module.exports = {isAuthenticated}