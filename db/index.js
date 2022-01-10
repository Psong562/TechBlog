const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : 'mysql://root:rootroot@localhost:3306/blog_db')


process.env.JAWSDB_URL || process.env.LOCALDB_URL