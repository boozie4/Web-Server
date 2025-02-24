const mysql = require('mysql');
const connection = require('../db-config');
const {
    ALL_TASKS, 
    SINGLE_TASK, 
    INSERT_TASK, 
    UPDATE_TASK, 
    DELETE_TASK
} = require('../queries/tasks.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers.js');

/**
 * CRUD = Create, Read, Update, Delete
 * GET = Read
 * POST = Create
 * PUT = Update
 * DELETE = Delete 
 */

// http://localhost:3000/tasks
exports.getAllTasks = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all tasks
    const tasks = await query(con, ALL_TASKS(req.user.id)).catch(
        serverError(res)
    );

    if(!tasks.length) {
        res.status(400).json({ msg: 'No tasks available for this user.' });
    }
    res.json(tasks);
};

// http://localhost:3000/tasks/1
exports.getTask = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query single task
    const task = await query(
        con, 
        SINGLE_TASK(req.user.id, req.params.taskId)
    ).catch(serverError(res));

    if(!task.length) {
        res.status(400).json({ msg: 'No tasks available for this user.' });
    }
    res.json(task);
};

// http://localhost:3000/tasks/1
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createTask = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query to create a task
    const result = await query(
            con, 
            INSERT_TASK, 
            [req.body.name]
        ).catch((err) => {
            res.send(err);
        });

        if(result.affectedRows !== 1) {
            res
              .status(500)
              .json({ msg: `Unable to add task: '${req.body.task_name}'`}); 
        }
        res.json({ msg: 'Added task successfully!'});
    }
};

/**
 * Build up values string.
 * 
 * @example 'key1 = value1, key2 = value2, ...'
 * "task_name = \'Task 1\', status = \'complete\', date = \'<today's_date>\'""
 */
const _buildValuesString = (req) => {
    const body = req.body;
    const values = Object.keys(body).map(
        (key) => `${key} = ${mysql.escape(body[key])}`
    );

    values.push(`created_date = NOW()`); // update current date and time
    values.join(', '); // make into a string
    return values;
};

//http://localhost:3000/tasks/1
/**
 * PUT request - 
 * {
 * name: 'A task name',
 * state: 'completed'
 * } 
 */
exports.updateTask = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });
    const values = _buildValuesString(req);

    // query to update a task
    const result = await query(
        con, 
        UPDATE_TASK(req.user.id, req.params.taskId, values) 
    ).catch(serverError(res));

    if(result.affectedRows !== 1) {
        res
          .status(500)
          .json({ msg: `Unable to update task: '${req.body.task_name}'`});
    }
    res.json(result);
};

exports.deleteTask = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query to delete a task
    const result = await query(
        con, 
        DELETE_TASK,  
        [req.params.taskId]
    ).catch(serverError(res));

    if(result.affectedRows !== 1) {
      res
      .status(500)
      .json({ msg: `Unable to delete task at: ${req.params.taskId}` });
    }
    res.json({ msg: 'Deleted successfully.' });
};

