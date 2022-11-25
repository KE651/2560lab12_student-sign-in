let {Sequelize, DataTypes} = require('sequelize')
// import both of these modules from the sequelize library

let env = process.env.NODE_ENV || 'development'
// environment variable, can read from the computer - typically string
// if not set, use development
//this will be used with the settings in config.json
console.log("Environment: ", env)

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]

let password = process.env.DB_PASSWORD
// don't need password for sqlite but will need for azure
config.password = password

let db = {}

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student') // defining a function
let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel
// associating the name of the model "Student" with return value of studentModelCreate function

db.sequelize = sequelize  // sequelize configuration
db.Sequelize = Sequelize  // Sequelize library

module.exports = db