const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_log', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Banco de Dados Conectado!')
// }).catch((err)=>{
//     console.error('Erro de Conexão!',err)
// })

module.exports = sequelize