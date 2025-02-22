const connection = require('../db-config');
const {
    ALL_TASKS, 
    SINGLE_TASK, 
    INSERT_TASK, 
    UPDATE_TASK, 
    DELETE_TASK
} = require('../queries/tasks.queries');
const query = require('../utils/query');

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
    const tasks = await query(con, ALL_TASKS).catch((err) => {
        res.send(err);
    });

    if(tasks.length) {
        res.json(tasks);
    }
};

// http://localhost:3000/tasks/1
exports.getTask = async (req,res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query single task
    const task = await query(con, SINGLE_TASK).catch((err) => {
        res.send(err);
    });

    if(task.length) {
        res.json(task);
    }
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
    const result = await query(con, INSERT_TASK, [req.body.name]).catch((err) => {
        res.send(err);
    });

    if(result.affectedRows == 1) {
        res.json({ msg: 'Added task successfully'});
    }
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

    // query to update a task
    const result = await query(con, UPDATE_TASK,  [req.body.name, req.body.status, req.params.taskId]).catch((err) => {
        res.send(err);
    });

    if(result.affectedRows == 1) {
        res.json(result);
    }
};

exports.deleteTask = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query to delete a task
    const result = await query(con, DELETE_TASK,  [req.params.taskId]).catch((err) => {
        res.send(err);
    });

    if(result.affectedRows == 1) {
        res.json({ msg: 'Deleted successfully.' });
    }
};

