/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name>, <data_type>, <options>)
 * 
 * Create a table called 'tasks' (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * -name with a max of 255 characters, cannot have null values
 * -created_date set to date and time created
 * -status with a max of 10 characters, has a default of 'pending'
 * 
 * NOTE: order is important.
 * - columns can have multiple options attached (take 'id' column for exampl)
 * - id is always first (helps with inserting)
 * - defaults always specified last (helps with inserting)
 */
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
 task_id int NOT NULL AUTO_INCREMEN, 
 user_id int NOT NULL,
 task_name varchar(255) NOT NULL, 
 created_date DATETIME DEFAULT CURRENT_TIMESTAMP(), 
 status varchar(10) DEFAULT 'pending',
 PRIMARY KEY (task_id)
 FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// Get every task
exports.ALL_TASKS = (userId) => `SELECT * FROM tasks WHERE user_id = ${userId}`;

// Get a single task by id
exports.SINGLE_TASK = (userId, taskId) =>
    `SELECT * FROM tasks WHERE user_id = ${userId} AND task_id = ${taskId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name2>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 * 
 * Create a new task in 'tasks' table where
 * - column names match the order they are in the table
 * - '?' allow us to use params in our controllers
 */
exports.INSERT_TASK = (userId, taskName) =>
    `INSER INTO tasks (user_id, task_name) VALUES (${userId}, ${taskName})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <column_name> = '<new_value>' WHERE <column_name> = '<old_values>'
 * 
 * NOTE: omitting 'WHERE' will result in updating every existing entry.
 */
exports.UPDATE_TASK = (userId, taskId, newValues) =>
    `UPDATE tasks SET ${newValues} WHERE user_id = ${userId} and task_id = ${taskId}`;

// Delete a task by id
exports.DELETE_TASK = (userId, taskId) =>
    `DELETE FROM tasks WHERE user_id = ${userId} AND task_id = ${taskId}`;
