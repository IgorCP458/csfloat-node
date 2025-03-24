const {Sequelize, DataTypes} = require('sequelize')
const connection = require('../database/database')

const Item = connection.define('Item', {
  itemID: {
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
  item: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isItemStructure(value) {
        if(!value || typeof value !== 'object') {
          throw new Error('Item deve ser um objeto')
        }

        const requiredFields = ['icon_url', 'market_hash_name', 'type', 'rarity_name', 'wear_name']
        for (const field of requiredFields) {
          if(!(field in value)) {
            throw new Error(`Campo "${field}" não encontrado em item`)
          }
        }

        if (typeof value.icon_url !== 'string') {
          throw new Error('O campo "icon_url" deve ser uma string');
        }
        if (typeof value.market_hash_name !== 'string') {
          throw new Error('O campo "market_hash_name" deve ser uma string');
        }
        if (typeof value.type !== 'string') {
          throw new Error('O campo "type" deve ser uma string');
        }
        if (typeof value.rarity_name !== 'string') {
          throw new Error('O campo "rarity_name" deve ser uma string');
        }
        
        if(value.type === 'skin') {
          if (typeof value.wear_name !== 'string' ) {
            throw new Error('O campo "wear_name" deve ser uma string');
          }
          if (typeof value.inspect_link !== 'string' ) {
            throw new Error('O campo "inspect_url" deve ser uma string: ' + typeof value.inspect_url + "!");
          }
        }

      }
    }
  }

})

Item.sync({force: true})
module.exports = Item
