
let express = require('express');
let router = express.Router();

let Assignment = require('../models/Assignment');


router.get('/', async (req, res, next) => {
    try {
        let assignments = await Assignment.find();

        res.render('assignments/index', {
            title: 'My Assignments',
            assignments: assignments
        });

    } catch (error) {
        return next(error);
    }
});


router.get('/', async (req, res, next) => {
    try {
        let assignments = await Assignment.find();

        let totalAssignments = assignments.length;
        let inProgress = 0;
        let completed = 0;

        for (let count = 0; count < assignments.length; count++) {
            if (assignments[count].status == 'In Progress') {
                inProgress++;
            }

            if (assignments[count].status == 'Completed') {
                completed++;
            }
        }

        res.render('assignments/index', {
            title: 'My Assignments',
            assignments: assignments,
            totalAssignments: totalAssignments,
            inProgress: inProgress,
            completed: completed
        });

    } catch (error) {
        return next(error);
    }
});

router.get('/add', (req, res) => {
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

router.get('/edit/:id', async (req, res, next) => {
    try {
        let assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.redirect('/assignments');
        }

        res.render('assignments/edit', {
            title: 'Edit Assignment',
            assignment: assignment
        });
    }
    catch (error) {
        return next(error);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        let assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.redirect('/assignments');
        }

        assignment.title = req.body.title;
        assignment.course = req.body.course;
        assignment.dueDate = req.body.dueDate;
        assignment.priority = req.body.priority;
        assignment.status = req.body.status;
        assignment.description = req.body.description;

        await assignment.save();

        res.redirect('/assignments');
    }
    catch (error) {
        return next(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.redirect('/assignments');
    }
    catch (error) {
        return next(error);
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);

        res.redirect('/assignments');
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;
