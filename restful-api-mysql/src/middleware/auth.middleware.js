const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config');

module.exports = function(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) {
        // stop user auth validation
        res.status(401).send({ auth: false, msg: 'Access Denied' });
    }

    try {
        // return the user's id when creating the token
        const verified = jwt.verify(token, jwtConfig.secret); // { id: '1', iat: 'aunsefu'}
        next();
    } catch (err) {
        res.status(400).send({ msg: 'Invalid Token' });
    }
};