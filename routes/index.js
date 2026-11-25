let express = require('express');
let router = express.Router();

let Assignment = require('../models/Assignment');


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

        res.render('index', {
            title: 'StudentTrack',
            assignments: assignments,
            totalAssignments: totalAssignments,
            inProgress: inProgress,
            completed: completed
        });

    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;
