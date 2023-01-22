const express = require('express');
const mongoose  = require('mongoose');
const { append } = require('express/lib/response');
const studentSchema = require('./models/studentsModel');
const HelperFunctions  = require('./helperFuncions');
const methods = new HelperFunctions();

app = express();
mongoose.set('strictQuery', true);
app.use(express.json()) // To parse the incoming json data; the data is attached to the req.body object after parsing.


const URL = 'mongodb+srv://tanmay:2022510005@cluster0.lbhju4i.mongodb.net/MyDatabase?retryWrites=true&w=majority'
mongoose.connect(URL)
.then(res => console.log('Connected successfully!'))
.catch(err => console.log('ERROR...'));



// CREATE
app.post('/addNewRecord', methods.validate, (req, res) => {
    const {name, dept} = req.body;
    const database = studentSchema();
    database.name = name;
    database.department = dept;
    database.save((error) => {
        if (error){
            res.status(500).json({message: 'Internal server error!'}).end();
        } else {
            res.status(200).json({message: "Data added successfully!"}).end();
        }
    })
})

app.patch('/updateRecord', methods.validate,  (req, res) => {
    const { id, field, data } = req.body;
    studentSchema.findOneAndUpdate({_id: id}, {[field]: data}, (error, data) => {
        if (error){
            let errMessage = methods.extractError(error);
            res.status(500).json({message: errMessage}).end();
        } else {
            res.status(200).json({message: "Data updated successfully! 👍"}).end();
        }
    })
})

// READ
app.get('/getData',methods.validate, (req, res) => {
    const {type, id} = req.body;
    if (type == "single"){
        
    } else {

    }
})


app.get('/', (req, res)=>{
    res.type('html').send('<h1>Server is up and running 😊</h1>');
})

app.get('/closeConnection', (req, res)=> {
    mongoose.connection.close()
    .then(data => res.send("Connection closed successfully").end())
    .catch(err => console.log(err));
})


app.listen(4000, () => {
    console.log('Listening on port 4000');
})

