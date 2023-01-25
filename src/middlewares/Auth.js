const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = {
    checkAuth: (req, res, next) => {

        const authHeader = req.get("Authorization");
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.failUnauthorized("No Auth Token");
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.failUnauthorized("Invalid Auth Token");
            };
            
            next();
        })
    }
}