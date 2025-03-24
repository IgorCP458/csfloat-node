const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = connection