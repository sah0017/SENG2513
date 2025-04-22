import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

const User = sequelize.define('user', {
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true
    },
  username: {
    type : DataTypes.STRING,
    unique : true,
    allowNull : false
  },
  password: DataTypes.STRING,
});

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password; // Don't expose password
  return values;
};

export default User;
export{ User };
