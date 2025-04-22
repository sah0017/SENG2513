import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

const Games = sequelize.define('games', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true
        },  
    title: {
        type : DataTypes.STRING,
        allowNull : false,
    },
    image : DataTypes.BLOB
});

Games.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

export default Games;
export{ Games };
