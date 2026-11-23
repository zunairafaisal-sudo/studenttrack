const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    title: String,
    course: String,
    dueDate: Date,
    priority: String,
    status: String,
    description: String
});

mongoose.model('Assignment', AssignmentSchema);
