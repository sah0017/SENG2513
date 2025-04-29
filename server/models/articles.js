import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Articles = sequelize.define('articles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'games',
      key: 'id'
    }
  }
});

// Define associations
Articles.associate = function(models) {
  Articles.belongsTo(models.Games, { foreignKey: 'gameId', as: 'game' });
};

Articles.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

export default Articles;
export { Articles };