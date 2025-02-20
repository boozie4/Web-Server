const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSER_NEW_USER,
} = require('../queries/user.queries');
const query = require('../utils/query.js');
const { refreshTokens, generateToken } = require('../utils/jwt-helpers');

exports.register = async (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password);
    const params = [req.body.username, req.body.email, passwordHash];

    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // check for existing user first
    const user = await query(con, GET_ME_BY_USERNAME, [req.body.username]).catch(
        (err) => {
            res.status(500);
            res.send({ msg: 'Could not retrieve user.' });
        }
    );

    con.query(
        authQueries.INSER_NEW_USER,
        [req.bosy.username, req.body.email, passwordHash],
        function(err, result) {
            if (err) {
                // stop registration
                console.log(err);
                res
                  .status(500)
                  .send({ msg: 'Could not register user. Please try again later' });
            }

            con.query(userQueries.GET_ME_BY_USERNAME, [req.body.username], function(
                err,
                user
            ) {
                if (err) {
                    res.status(500);
                    res.send({ msg: 'Could not retrieve user.' });
                }

                console.log(user);
                res.send(user);
            });
        }
    );
};

exports.login = function(req, res) {
    // check user exists
    con.query(
        userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
        [req.body.username],
        function(err, user) {
            if (err) {
                res.status(500);
                res.send({ msg: 'Could not retrieve user.' });
            }

            console.log(user);
            // validate entered password from database saved password
            bcrypt
              .compare(req.body.password, user[0].password)
              .then(function(validPass) {
                if (!validPass) {
                    res.status(400).send({ msg: 'Invalid password!' });
                }
                // create token
                const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
                res
                  .header('auth-token', token) // { 'auth-token': 'jasndfjsdfnhioje99f'}
                  .send({ auth: true, msg: 'Logged in!' });
              })
              .catch(console.log);
        }
    );
};

exports.updateUser = function(req, res) {
    // check user exists
    con.query(
        userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
        [req.user.id],
        function(err, user) {
           console.log(err, user);
           if (err) {
            res.status(500);
            res.send({ msg: 'Could not retrieve user.' });
            }
        
            console.log(user);
            console.log(req.body.username);
            console.log(req.body.password);

            const passwordHash = bcrypt.hashSync(requestIdleCallback.body.password);

            // perform update
            con.query(
                authQueries.UPDATE_USER,
                [req.body.username, req.body.email, passwordHash. user[0].id],
                function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ msg: 'Could not update user settings.' });
                    }

                    console.log(results);
                    res.json({ msg: 'Updated successfully!' });
                }
            );
        }
    );
};
