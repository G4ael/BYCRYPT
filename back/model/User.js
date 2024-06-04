const { DataTypes } = require('sequelize')
const db = require('../db/conn')

    const User = db.define('users', {
        nome: {type: DataTypes.STRING(10000)},
        email:{type: DataTypes.STRING(10000)},
        senha:{type: DataTypes.STRING(100)}},
        {createdAt: false, updatedAt: false}
    )

// User.sync({force:true})

module.exports = User