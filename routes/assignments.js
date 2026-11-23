
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

    } catch (error) {
        return next(error);
    }
});

module.exports = router;
