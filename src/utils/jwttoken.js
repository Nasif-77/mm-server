const jwt = require('jsonwebtoken');
const logger = require('../libs/winstonLogger');


module.exports = {
    tokenVerify: (req, res, next) => {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ error: "Unauthrized ❗" })
        }
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token ❌" })
            }
            next()
        })

    }


}



