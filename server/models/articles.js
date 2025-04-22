import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

const Articles = sequelize.define('articles', {
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true
    },
  content : DataTypes.JSON,
});

Articles.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

export default Articles;
export{ Articles };
