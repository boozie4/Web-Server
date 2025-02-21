const { jwtconfig, verifyToken } = require('../utils/jwt-helps');

module.exports = (req, res, next) => {
    const authHeader = req.headers['auth-token' || req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
    ]

    if (!accessToken) {
        // stop user auth validation
        .status(401)
        .send({ auth: false, msg: 'Access Denied. No token provided.' });
    }

    try {
        // return the user's id when creating the token
        const user = verifyToken(accessToken, jwtconfig.acess, req, res);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).send({ msg: 'Invalid Token' });
    }
};
