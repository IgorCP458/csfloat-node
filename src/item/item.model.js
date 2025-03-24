const {Sequelize, DataTypes} = require('sequelize')
const connection = require('../database/database')

const Item = connection.define('Item', {
  listingId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  price:  {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  float:  {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  seller:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  paint_seed:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  icon_url:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  market_hash_name:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  type:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  rarity_name:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  wear_name:  {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_stattrak:  {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  is_souvenir:  {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  
})

//Item.sync({force: true})
module.exports = Item
