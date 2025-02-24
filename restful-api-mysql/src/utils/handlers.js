exports.serverError = (res) => (err) => {
    console.log(err);
    res.status(500).send({
        error: {
            msg: err.message,
        },
        msg: 'Cannon process response at this time. Please try again shortly.',
    });
};
