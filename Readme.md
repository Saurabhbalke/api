# Task record App - REST API Documentation
RESTful API Designed in Node.js for a very simple Task application for task.

## Index
* [Requirements](#requirements)
* [Installation](#installation)
* [Schema](#schema)
* [Root End-Point](#root-end-point)
* [Request & Response Examples](#request--response-examples)

## Requirements

- [node & npm](http://nodejs.org)
- [MongoDB](https://www.mongodb.com/): Make sure you have your own local or remote MongoDB database URI configured in `credentials/mongo.js`

## Installation

1. Clone the repository: `https://github.com/Saurabhbalke/pacefin.git`
2. Install the application: `npm install`
3. Start the server: `node index.js` or `node .`
4. Open PostMan or Thunder Client and make a `GET` request to `http://localhost:3000/`

## Schema

1. All API access is over HTTP, and accessed from `http://localhost:3000/api/task`.
2. All data is sent and received as JSON.
3. Blank fields are included as `null` instead of being omitted.
4. All timestamps return in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`

## Root End-Point
`http://localhost:3000/api`


### Task
`Task` object represents a snapshot of a specific task with a unique ID. You can retrieve it to see details about the Task.

#### Schema
```javascript
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: 'N/A'
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    timestamps: {
        createdOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        modifiedOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        completedOn: {
            type: Date,
            default: null
        }
    }
}
```
#### End-Points
| Method | End-Point | Description |
| --- | --- | --- |
| `GET` | `/tasks` | List all *tasks* |
| `POST` | `/tasks` | Create a new *task* |
| `GET` | `/tasks/:taskId` | Fetch a specific *task* |
| `PUT` | `/tasks/:taskId` | Edit existing *task* |
| `PATCH` | `/tasks/:taskId` | Mark an existing *task* as complete |
| `DELETE` | `/tasks/:taskId` | Delete existing *task* |


## Request & Response Examples

### API Resources
  - [GET /tasks](#get-Task)
  - [GET /tasks/:taskId](#get-TaskTaskId)
  - [POST /tasks](#post-Task)
  - [PUT /tasks/:taskId](#put-TaskTaskId)
  - [PATCH /tasks/:taskId](#patch-TaskTaskId)
  - [DELETE /tasks/:taskId](#delete-TaskTaskId)

### GET /tasks
To get the list of all *task*
#### Resourse Url
`http://localhost:3000/api/tasks`
#### Response
```javascript
   {
  "status": "Success",
  "message": "Tasks Fetched Successfully!",
  "Tasks": [
    {
      "timestamps": {
        "completedOn": null,
        "createdOn": "2023-12-21T13:35:27.054Z",
        "modifiedOn": "2023-12-21T13:35:27.054Z"
      },
      "description": "this is   description1",
      "isCompleted": false,
      "_id": "65843f1fd905195f5cea5f42",
      "title": "task 1",
      "__v": 0
    },
    {
      "timestamps": {
        "completedOn": null,
        "createdOn": "2023-12-21T13:35:39.683Z",
        "modifiedOn": "2023-12-21T13:36:12.934Z"
      },
      "description": "this is updated  description2",
      "isCompleted": false,
      "_id": "65843f2bd905195f5cea5f43",
      "title": "task 2",
      "__v": 0
    }
  ],
  "TaskCount": 2
}
}
```

### GET /tasks/:taskId
To get a specific *task*
#### Resourse Url
`http://localhost:3000/api/tasks/{{taksId}}`
#### Request Params
`{{TaskId}}`
#### Request Body
`N/A`
#### Response
```javascript
{
  "status": "Success",
  "message": "Task Fetched Successfully!",
  "Task": {
    "timestamps": {
      "completedOn": null,
      "createdOn": "2023-12-21T13:35:39.683Z",
      "modifiedOn": "2023-12-21T13:36:12.934Z"
    },
    "description": "this is updated  description2",
    "isCompleted": false,
    "_id": "65843f2bd905195f5cea5f43",
    "title": "task 2",
    "__v": 0
  }
}
```

### POST /tasks
To create a new *task*
#### Resourse Url
`http://localhost:3000/api/tasks`
#### Request Params
`N/A`
#### Request Body
```javascript
{
    "title": "Write Test-Cases",
    "description": "Write Test-Cases for task API"
}
```
#### Response
```javascript
{
  "status": "Success",
  "message": "Task Created SuccessFully!",
  "Task": {
    "timestamps": {
      "completedOn": null,
      "createdOn": "2023-12-21T16:47:00.491Z",
      "modifiedOn": "2023-12-21T16:47:00.491Z"
    },
    "description": "Write Test-Cases for task API",
    "isCompleted": false,
    "_id": "65846c04d905195f5cea5f44",
    "title": "Write Test-Cases",
    "__v": 0,
    "taksId": "65846c04d905195f5cea5f44"
  }
}
```

### PUT /tasks/:taskId
To edit an existing *task*
#### Resourse Url
`http://localhost:3000/api/task/{{taskId}}`
#### Request Params
`{{taskId}}`
#### Request Body
```javascript
{
    "title": "UPDATED: Write Documentation",
    "description": "UPDATED: Write documentation for Task API"
}
```
#### Response
```javascript
{
  "status": "Success",
  "message": "Task Updated Successfully!",
  "Task": {
    "timestamps": {
      "completedOn": null,
      "createdOn": "2023-12-21T16:47:00.491Z",
      "modifiedOn": "2023-12-21T16:47:45.896Z"
    },
    "description": "UPDATED: Write documentation for Task API",
    "isCompleted": false,
    "_id": "65846c04d905195f5cea5f44",
    "title": "UPDATED: Write Documentation",
    "__v": 0
  }
}
```
### PATCH /tasks/:taskId
To mark a *task* as Complete
#### Resourse Url
`http://localhost:3000/api/tasks/{{taskId}}`
#### Request Params
`{{taskId}}`
#### Request Body
`N/A`
#### Response
```javascript
{
  "status": "Success",
  "message": "Task Marked as Completed!",
  "Task": {
    "timestamps": {
      "completedOn": "2023-12-21T16:48:08.744Z",
      "createdOn": "2023-12-21T16:47:00.491Z",
      "modifiedOn": "2023-12-21T16:48:08.743Z"
    },
    "description": "UPDATED: Write documentation for Task API",
    "isCompleted": true,
    "_id": "65846c04d905195f5cea5f44",
    "title": "UPDATED: Write Documentation",
    "__v": 0
  }
}
```

### DELETE /tasks/:taskId
To delete an existing *Task*
#### Resourse Url
`http://localhost:3000/api/tasks/{{taskId}}`
#### Request Params
`{{taskId}}`
#### Request Body
`N/A`
#### Response
```javascript
{
    "status": "Success",
    "message": "Task Deleted Successfully!"
}
```
