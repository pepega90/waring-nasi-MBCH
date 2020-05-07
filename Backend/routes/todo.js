const express = require('express');

const router = express.Router();

const todoController = require('../controller/todo');

router.get('/todo', todoController.getTodo);

router.post('/todo', todoController.postTodo);

router.put('/todo/:todoId', todoController.updateTodo);

router.delete('/todo/:todoId', todoController.deleteTodo);

module.exports = router;
