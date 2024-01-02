const express = require("express");
const TaskController = require('../controllers/taskController');

const router = express.Router();

// create new task
router.post('/', TaskController.createTask);

// display all task 
router.get('/', TaskController.getAllTasks);

// display task with taskId
router.get('/:taskId', TaskController.getTask);

// update task 
router.put('/:taskId', TaskController.updateTask);


// delete task
router.delete('/:taskId', TaskController.deleteTask);

// update isCompleted feild 
router.patch('/:taskId', TaskController.completeTask);
module.exports = router;