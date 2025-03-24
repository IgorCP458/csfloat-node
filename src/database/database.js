const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
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