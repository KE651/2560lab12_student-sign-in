let express = require('express')
let Sequelize = require('sequelize')
const { sequelize } = require('../models')
let db = require('../models')
// models is a directory, by default when dir is required it will take what index.js exports

let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next) {
    // Student is db with various methods such as create, destroy, findAll, etc

    // findAll returns a promise so need then
    // returns array of student objects from db
    // convert to JSON and return sorted by name
    Student.findAll( {order: ['present','starID']}).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})

router.post('/students', function(req, res, next) {
    Student.create(req.body).then( data => {
        // it returns data which we can ignore
        console.log('router.post in api.js reached')
        return res.status(201).send('created')
        // messages in the 200s are success messages
        // setting created success message to 201
    }).catch( err => {
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
            // user error such as missing starID
        } // end if

        // if another kind of error
        return next(err)
        // this will go back to error handler in server.js
    }) // end catch
}) // end router.post

// edit student
router.patch('/students/:id', function(req, res, next){
    let studentID = req.params.id
    console.log('router.patch reached')
    // this sets studentID to the value of the request parameter
    let updatedStudent = req.body
    Student.update(updatedStudent, { where: {id: studentID} } )
        .then( (rowsModified) => {
            console.log('student.update in api.js')
            let numberOfRowsModified = rowsModified[0]
            if (numberOfRowsModified == 1) {
                return res.send('ok') 
            }
            else {
                return res.status(404).json(['Student with given ID not found.'])
            } // end else 
        } ) // end then
            .catch( err => {
                if (err instanceof db.Sequelize.ValidationError) {
                    let messages = err.errors.map( e => e.message)
                    return res.status(400).json(messages)
                } else { // unexpected error
                return next(err) // send to error handler in server.js
                }
            })
        
})

// delete student
router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    Student.destroy( {where: { id: studentID } } )
        .then( (rowsDeleted) => {
            // if row that doesn't exist is requested to delete
            if (rowsDeleted==1){
                return res.send('deleted')}
                else {
                    return res.status(404).json(['Not found (router.delete in api.js).'])
                } // end else
        }).catch( err => next(err)) // for unexpected errors // end then
}) // end router.delete

module.exports = router
//any code after this line is ignored
// this route will be connected into server.js