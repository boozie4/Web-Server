const escape = require('mysql').escape;

/**
 * Escape all request body values so mysql is happy.
 * 
 * @example
 * {
 *  username: 'admin',
 *  password: 'password',
 *  email: 'admin@example.com'
 * }
 * 
 * 1. ['username', 'password', 'email']
 * 2. Iterate/loop over each individual key
 * 3. Takes the accumulator and bind key-value pairs into the object.
 * 
 * 
 * result:
 * {
 *  username: "'admin4'"
 *  password: "'password'"
 *  email: "'admin@example.com'"
 * }
 * 
 * This will reassign values on the body objext with new values.
 */
modules.exports = (body) => {
    return Object.keys(body).reduce((acc, key) => {
        acc[key] = escape(body[key]);
        return acc;
    }, {});
};
