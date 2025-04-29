import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Games = sequelize.define('games', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Define associations
Games.associate = function(models) {
  Games.hasMany(models.Articles, { foreignKey: 'gameId', as: 'articles' });
};

Games.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

export default Games;
export { Games };