import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';


const Notes = sequelize.define('notes', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
        },
  content : DataTypes.JSON,
});

Notes.associate = function(models) {
    Notes.belongsTo(models.Games, {foreignKey : 'gameId', as : 'game'})
    Notes.belongsTo(models.User, {foreignKey : 'userId', as : 'user'})
};

Notes.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

export default Notes;
export{ Notes };
