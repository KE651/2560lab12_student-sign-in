// this defines the Student model which defines table columns

module.exports = (sequelize, DataTypes) => {
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z]{2}\d{4}[a-zA-Z]{2}$/
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
    })


    // the next statement returns a promise, force: true means drop/redraw table when app restarts, 
    // need if table can change
    Student.sync( {force: false}).then( () => {
        console.log('Student table was synced.')
    })
// run this, set false to true, restart server, then set back to false and restart again

    return Student
}