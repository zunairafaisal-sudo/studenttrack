
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Assignment = require('../models/Assignment');


router.get('/', async (req, res, next) => {
    try {

        let assignments = await Assignment.find();

        res.render('assignments/index', {
            title: 'My Assignments',
            assignments: assignments
        });

    }
    catch (error) {
        return next(error);
    }
});


router.get('/add', (req, res, next) => {

    res.render('assignments/add', {
        title: 'Add Assignment'
    });

});

router.post('/add', async (req, res, next) => {
    try {

        let newAssignment = new Assignment({
            title: req.body.title,
            course: req.body.course,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            description: req.body.description
        });

        await newAssignment.save();

        res.redirect('/assignments');

    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;
