// ***********************************
//ERROR_HANDLING MIDDLEWARE FUNCTIONS
// ***********************************

/**
 * Handle req that would produce 404 status code and response accordingly.
 */
exports.error404 = (req, res, next) => {
    next({ message: 'Not Found', status: 404});
}

/**
 * Handle req that would produce a 500 status code and response accoringly.
 */
exports.error500 = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
};

console.log(exports);
