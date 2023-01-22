const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    department:{
        type: String,
        trim: true,
        required: true
    }
})

const studentSchema = mongoose.model('student', schema);
module.exports = studentSchema;