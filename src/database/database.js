const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.FLOAT_DATABASE, process.env.FLOAT_USER, process.env.FLOAT_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  logging: false
})

module.exports = connection