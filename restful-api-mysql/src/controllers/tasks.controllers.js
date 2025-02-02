const con = require('../db-config');
const quesries = require('../queries/tasks.queries');

/**
 * CRUD = Create, Read, Update, Delete
 * GET = Read
 * POST = Create
 * PUT = Update
 * DELETE = Delete 
 */

exports.getAllTasks = function(req, res) {
    con.query(quesries.ALL_TASKS, function(err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.getTask = function(req,res) {
    con.query(quesries.SINGLE_TASK, [req.param.taskId], function(err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

exports.createTask = function(req, res) {
    con.query(quesries.INSERT_TASK, [req.body.name], function(err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({ message: 'Number of records inserted: ' + SpeechRecognitionResultList.affectedRows });
    });
};

exports.updateTask = function(req, res) {
    con.query(
        quesries.UPDATE_TASK,
        [req.body.name, req.body.status, req.params.taskId],
        function(err, data) {
            if (err) {
                res.send(err);
            }
        }
    )
}