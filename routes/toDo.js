const express = require('express');
const ToDo = require('../models/ToDO');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('./cors');
var authenticate = require('../authenticate');



router.use(bodyParser.urlencoded({extended:true}));

//To Do tasks
router.get('/',authenticate.verifyToken,async (req, res) => {
    try {
        const tasks = await ToDo.find({status: false});
        res.status(200).json({
            data: tasks,
            status: true
        });
    } catch (err) {
        res.status(400).json({
            message: err
        });

    }
});

//Get Completed Tasks
router.get('/completed',authenticate.verifyToken, async (req, res) => {
    try {
        const tasks = await ToDo.find({status: true});
        res.status(200).json({
            data: tasks,
            status: true
        });
    } catch (err) {
        res.status(400).json({
            message: err
        });

    }
});


//to post one item
router.post('/',authenticate.verifyToken, async (req,res) => {
    const task = new ToDo(req.body);

    try {
        const savedTask = await task.save();
        res.status(200).json({
            data: savedTask,
            status: true
        });
    } catch (err) {
        res.status(404).json({
            message: err
        });
    }
});

//specific task
router.get('/:taskId',authenticate.verifyToken, async (req,res) => {
    try {
    const task = await ToDo.findById(req.params.taskId);
    res.json(task);
    } catch(err) {
        res.json({
            message: err
        });
    }
});

//delete specific task

router.delete('/:taskId', authenticate.verifyToken, async (req,res) => {
    try {
        const task = await ToDo.deleteOne({_id: req.params.taskId});
        console.log("delete is hit ");
        res.json(task);
    } catch(err) {
        res.json({
            message: err
        });
    }
});

//update a task

router.patch('/:taskId',authenticate.verifyToken, async (req,res) => {
    try {
        const task = await ToDo.updateOne({_id: req.params.taskId}, { $set: {status: req.body.status} });
        res.json(task);
    } catch (err) {
        res.json({
            messsage: err

        });

    }
})
module.exports = router;