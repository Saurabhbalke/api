const Task = require("../models/task");

// To Create a Task
exports.createTask = (req, res, next) => {

    const task = new Task(req.body);
    task.save()
        .then(
            createdTask => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'task Created SuccessFully!',
                    'task': {
                        ...createdTask._doc,
                        taksId: createdTask._id
                    }
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// display all task
exports.getAllTasks = (req, res, next) => {

    const TaskQuery = Task.find()

    TaskQuery.then(
            tasks => {
                if (!tasks.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No tasks found!',
                        'tasks': tasks,
                        'taskCount': tasks.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'tasks Fetched Successfully!',
                    'tasks': tasks,
                    'taskCount': tasks.length
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

//  display particular task
exports.getTask = (req, res, next) => {
    const taskId = req.params.taskId;

    Task.findOne({
            _id: taskId
        })
        .then(
            task => {
                if (!task) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No task found with that Id!',
                        'task': task
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'task Fetched Successfully!',
                    'task': task
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To Update a Task
exports.updateTask = (req, res, next) => {

    const taskId = req.params.taskId;
    const data = req.body;

    Taks.findOneAndUpdate({
            _id: taskId
        }, {
            ...data,
            'timestamps.modifiedOn': Date.now()
        }, {
            new: true,
            useFindAndModify: false
        })
        .then(
            updatedTask => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'task Updated Successfully!',
                    'task': updatedTask
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
    if(data.isCompleted) {
        this.completeTask(req, res);
    }
}

// To Mark task Complete
exports.completeTask = (req, res, next) => {
    const taskId = req.params.taskId;
    Task.findOneAndUpdate({
            _id: taskId
        }, {
            'isCompleted': true,
            'timestamps.modifiedOn': Date.now(),
            'timestamps.completedOn': Date.now()
        }, {
            new: true
        })
        .then(
            updatedTask => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'task Marked as Completed!',
                    'task': updatedTask
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}
exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    Task.findOneAndDelete({
            _id: taskId
        })
        .then(
            deletedTask => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'task Deleted Successfully!'
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}